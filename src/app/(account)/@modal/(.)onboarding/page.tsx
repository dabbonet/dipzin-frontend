"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Shared/button';
import { DialogFooter } from '@/components/UI/dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Modal from '../modal';

const onboardingSteps = [
  {
    image: '/assets/onboarding/1.svg',
    heading: 'Multi-App Comparison Made Easy',
    content: 'Easily compare multiple apps with our tabbed header. View designs side by side to gain insights and make more informed design decisions.'
  },
  {
    image: '/assets/onboarding/2.svg',
    heading: 'Discover Design Trends',
    content: 'Explore a vast collection of app designs to stay updated with the latest UI/UX trends and get inspired for your next project.'
  },
  {
    image: '/assets/onboarding/3.svg',
    heading: 'Streamline Your Workflow',
    content: 'Save time and boost productivity with our intuitive tools designed to enhance your app design process from start to finish.'
  }
];

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: { step: string };
}) {
  const initialStep = parseInt(searchParams.step, 10) || 1;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(initialStep - 1);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [WheelGesturesPlugin()]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedStep = emblaApi.selectedScrollSnap();
    setCurrentStep(selectedStep);
    router.push(`/onboarding?step=${selectedStep + 1}`);
    if (initialStep === 3) {
      router.push(`/ios/screens`);
    } else {
      router.push(`/onboarding?step=${currentStep + 1}`);
    }
  }, [currentStep, emblaApi, initialStep, router]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(initialStep - 1, false);
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, initialStep, onSelect]);

  const handleDismiss = () => {
    router.push('/ios/screens');
  };

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      emblaApi?.scrollNext();
    } else {
      handleDismiss();
    }
  };

  return (
    <Modal>
      <div className="overflow-hidden flex w-full" ref={emblaRef}>
        <div className="flex gap-4">
          {onboardingSteps.map((step) => (
            <div key={step.heading} className="flex-[0_0_100%]">
              <div className="flex flex-col gap-8 font-outfit">
                <Image
                  src={step.image}
                  alt={step.heading}
                  width={650}
                  height={335}
                />
                <h1 className="text-[2rem] leading-snug font-semibold text-white">
                  {step.heading}
                </h1>
                <p className="text-[1.25rem] text-slate-400">
                  {step.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DialogFooter className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-1">
          {onboardingSteps.map((_, index) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              aria-label={`onboarding step ${index + 1}`}
              className={`size-2.5 rounded-full ${
                currentStep === index ? 'bg-aqua-600' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button className="w-full max-w-[170px]" variant="darkGray" onClick={handleDismiss}>
            Skip
          </Button>
          <Button className="w-full max-w-[170px]" onClick={handleNextStep}>
            {currentStep === onboardingSteps.length - 1 ? "Explore" : "Next"}
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  );
}
