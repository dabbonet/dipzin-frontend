"use client";

import { Button } from "@/components/Shared/button";
import { Dialog, DialogContent } from "@/components/UI/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from "@/components/UI/drawer";
import { Logo } from "@/components/UI/logo";
import React, { useEffect } from "react";
import { useOnboarding } from "./_hooks/useOnboarding";

const onboardingSteps = [
  {
    title: "Multi-App Comparison Made Easy",
    description:
      "Easily compare multiple apps with our tabbed header. View designs side by side to gain insights and make more informed design decisions.",
  },
  {
    title: "Discover Design Trends",
    description:
      "Explore a vast collection of app designs to stay updated with the latest UI/UX trends and get inspired for your next project.",
  },
  {
    title: "Streamline Your Workflow",
    description:
      "Save time and boost productivity with our intuitive tools designed to enhance your app design process from start to finish.",
  },
];

const MobileOnboarding: React.FC = () => {
  const {
    currentStep,
    showModal,
    status,
    user,
    onboardingStep,
    handleNextStep,
    handleSkip,
  } = useOnboarding(onboardingSteps);

  const [progresses, setMobileProgresses] = React.useState<number[]>([0, 0, 0]);

  // In mobile-onboarding.tsx
  useEffect(() => {
    if (currentStep < onboardingSteps.length) {
      const duration = 5000;
      const startTime = Date.now();

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const percentage = Math.min((elapsed / duration) * 100, 100);
        setMobileProgresses((prev) => {
          const newProgresses = [...prev];
          newProgresses[currentStep] = percentage;
          return newProgresses;
        });

        if (percentage < 100) {
          requestAnimationFrame(animateProgress);
        } else {
          handleNextStep();
        }
      };

      animateProgress();
    }
    // Remove handleNextStep from the dependency array
  }, [currentStep]);

  if (status === "loading" || (status === "authenticated" && user?.confirmed)) return null;
  // if (!showModal) return null;

  return (
    <Dialog open={showModal}>
      <DialogContent className="size-full bg-slate-950 flex flex-col px-4 md:px-8 lg:px-10 xl:px-16 2xl:px-[100px]">
        <div className="flex gap-2 mt-4">
          {progresses.map((progress, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-aqua-600 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          ))}
        </div>
        <div className="size-fit flex items-center gap-3">
          <span className="relative w-12 flex items-center justify-center aspect-square shrink-0 rounded-full border-[0.8px] border-slate-700 px-1.5 bg-black-950">
            <Logo.Dipzin className="size-full" />
          </span>
          <div>
            <h3 className="text-base leading-normal font-medium">Dipzin</h3>
            <p className="text-white/60 text-xs">Design, Discover, Inspire</p>
          </div>
        </div>

        <Drawer defaultOpen>
          <DrawerContent className="bg-slate-900 p-3 rounded-t-3xl text-center">
            <DrawerHeader className="text-lg font-semibold">{onboardingStep?.title}</DrawerHeader>
            <DrawerDescription className="text-white/60 text-sm">
              {onboardingStep?.description}
            </DrawerDescription>
            <DrawerFooter className="w-full h-fit flex flex-row gap-x-4 mt-4">
              <Button className="flex-1" variant="ghost" fullWidth size="lg" onClick={handleSkip}>
                Skip
              </Button>
              <Button
                className="flex-1"
                fullWidth
                size="lg"
                onClick={handleNextStep}
              >
                {currentStep === onboardingSteps.length - 1 ? "Explore" : "Next"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DialogContent>
    </Dialog>
  );
};

export default MobileOnboarding;
