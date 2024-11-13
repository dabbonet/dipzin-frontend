"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/Shared/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/UI/dialog";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/updateUser";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { data: session, status, update } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated" && user) {
      if (!user.confirmed) {
        setShowModal(true);
      }
    }
  }, [status, user]);

  if (status === "loading") return null;
  if (status === "authenticated" && user?.confirmed) return null;
  if (!showModal) return null;

  const handleComplete = async () => {
    try {
      if (user?.token && user?.id) {
        await updateUser({ confirmed: true }, user.token, user.id);
      }
      await update({});
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSkip = async () => {
    try {
      if (user?.token && user?.id) {
        await updateUser({ confirmed: true }, user.token, user.id);
      }
      await update({});
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <Dialog modal open={showModal}>
      <DialogContent className="bg-slate-900 border-2 border-slate-800 p-10 max-w-[730px]">
        <div className="flex flex-col gap-4 font-outfit">
          {onboardingSteps[currentStep] && (
            <>
              <motion.div
                key={onboardingSteps[currentStep].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={onboardingSteps[currentStep].image}
                  alt={onboardingSteps[currentStep].heading}
                  priority
                  loading="eager"
                  width={650}
                  height={335}
                  className="w-[650px] h-[335px]"
                />
              </motion.div>
              <motion.h1
                key={onboardingSteps[currentStep].heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[2rem] leading-snug font-semibold text-white"
              >
                {onboardingSteps[currentStep].heading}
              </motion.h1>
              <motion.p
                key={onboardingSteps[currentStep].content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[1.25rem] text-slate-400"
              >
                {onboardingSteps[currentStep].content}
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
            <Button
              className="w-full max-w-[170px]"
              variant="darkGray"
              onClick={handleSkip}
            >
              Skip
            </Button>

            {currentStep === onboardingSteps.length - 1 ? (
              <Button className="w-full max-w-[170px]" onClick={handleComplete}>
                Explore
              </Button>
            ) : (
              <Button className="w-full max-w-[170px]" onClick={handleNextStep}>
                Next
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
