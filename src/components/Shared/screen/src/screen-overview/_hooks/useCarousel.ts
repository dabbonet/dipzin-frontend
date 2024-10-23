"use client"

import {
  useCallback, useEffect, useRef, useState
} from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

const TWEEN_FACTOR = 0.3;

export const useCarousel = (initialIndex: number = 0) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    dragFree: false,
    startIndex: initialIndex // Add this line to set initial slide
  });

  const tweenFactor = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR * api.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrolling = Boolean(engine.scrollBody.velocity);

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap?.forEach((slideIndex) => {
        if (!isScrolling && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = Math.max(0, Math.min(tweenValue, 1));
        const slideNode = api.slideNodes()[slideIndex];
        if (slideNode) slideNode.style.opacity = opacity.toString();
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // Initial setup
    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);

    // Force scroll to initial index after initialization
    emblaApi.scrollTo(initialIndex);

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', setTweenFactor);
    emblaApi.on('reInit', tweenOpacity);
    emblaApi.on('scroll', tweenOpacity);

    // Initial opacity setup
    emblaApi.slideNodes().forEach((slideNode) => {
      const node = slideNode;
      node.style.opacity = '0';
    });

    const selectedSlideNode = emblaApi.slideNodes()[emblaApi.selectedScrollSnap()];
    if (selectedSlideNode) {
      selectedSlideNode.style.opacity = '1';
    }

    // eslint-disable-next-line consistent-return
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', setTweenFactor);
      emblaApi.off('reInit', tweenOpacity);
      emblaApi.off('scroll', tweenOpacity);
    };
  }, [emblaApi, tweenOpacity, setTweenFactor, initialIndex]);

  return {
    emblaRef,
    currentIndex,
    prevBtnDisabled,
    nextBtnDisabled,
    scrollPrev,
    scrollNext
  };
};
