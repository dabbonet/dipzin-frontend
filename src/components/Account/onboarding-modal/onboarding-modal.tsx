// OnboardingModal.tsx

"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/Shared/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/UI/dialog";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import MobileOnboarding from "./mobile-onboarding";
import { useOnboarding } from "./_hooks/useOnboarding";

const onboardingSteps = [
  {
    image: "/assets/onboarding/1.svg",
    heading: "Multi-App Comparison Made Easy",
    content:
      "Easily compare multiple apps with our tabbed header. View designs side by side to gain insights and make more informed design decisions.",
  },
  {
    image: "/assets/onboarding/2.svg",
    heading: "Discover Design Trends",
    content:
      "Explore a vast collection of app designs to stay updated with the latest UI/UX trends and get inspired for your next project.",
  },
  {
    image: "/assets/onboarding/3.svg",
    heading: "Streamline Your Workflow",
    content:
      "Save time and boost productivity with our intuitive tools designed to enhance your app design process from start to finish.",
  },
];

export default function OnboardingModal() {
  const isMobile = useIsMobile();
  const {
    currentStep,
    showModal,
    status,
    user,
    onboardingStep,
    handleNextStep,
    handleSkip,
    handleStepClick,
  } = useOnboarding(onboardingSteps);

  if (status === "loading" || (status === "authenticated" && user?.confirmed)) return null;
  if (!showModal) return null;
  if (isMobile) {
    return <MobileOnboarding />;
  }

  return (
    <Dialog modal open={showModal}>
      <DialogContent className="bg-slate-900 border-2 border-slate-800 p-10 max-w-[730px]">
        <DialogTitle className="sr-only">Welcome to Dipzin</DialogTitle>
        <div className="flex flex-col gap-4">
          {onboardingStep && (
            <>
              <motion.div
                key={onboardingStep.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={onboardingStep.image!}
                  alt={onboardingStep.heading!}
                  priority
                  loading="eager"
                  width={650}
                  height={335}
                  className="w-[650px] h-[335px]"
                />
              </motion.div>
              <motion.h1
                key={onboardingStep.heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[2rem] leading-snug font-semibold text-white"
              >
                {onboardingStep.heading}
              </motion.h1>
              <motion.p
                key={onboardingStep.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[1.25rem] text-slate-400"
              >
                {onboardingStep.content}
              </motion.p>
            </>
          )}
        </div>
        <DialogFooter className="w-full flex items-center justify-between">
          <div className="w-full flex items-center gap-1">
            {onboardingSteps.map((_, index) => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={`step-${index}`}
                aria-label={`onboarding step ${index + 1}`}
                className={`size-2.5 rounded-full ${
                  currentStep === index ? "bg-aqua-600" : "bg-slate-800 cursor-pointer"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: currentStep === index ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button className="w-full max-w-[170px]" variant="darkGray" onClick={handleSkip}>
              Skip
            </Button>
            <Button className="w-full max-w-[170px]" onClick={handleNextStep}>
              {currentStep === onboardingSteps.length - 1 ? "Explore" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
