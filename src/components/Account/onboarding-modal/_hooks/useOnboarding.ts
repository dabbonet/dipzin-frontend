import { useState, useEffect } from "react";
import { updateUser } from "@/actions/updateUser";
import { useSession } from "next-auth/react";

interface OnboardingStep {
  image?: string;
  heading?: string;
  content?: string;
  title?: string;
  description?: string;
}

export function useOnboarding(onboardingSteps: OnboardingStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { data: session, status, update } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated" && user && !user.confirmed) {
      setShowModal(true);
    }
  }, [status, user]);

  const handleComplete = async () => {
    if (user?.token && user?.id) {
      await updateUser({ confirmed: true }, user.token, user.id);
    }
    await update({});
    setShowModal(false);
  };

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = async () => {
    await handleComplete();
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return {
    currentStep,
    showModal,
    status,
    user,
    onboardingStep: onboardingSteps[currentStep],
    handleComplete,
    handleNextStep,
    handleSkip,
    handleStepClick,
    setShowModal,
    setProgresses: setCurrentStep, // For mobile onboarding progress
  };
}
