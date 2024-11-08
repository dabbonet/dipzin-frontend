"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { getInterests } from "../_actions/getInterests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import positions from "../_static/positions.json";
import { updateUser } from "@/actions/updateUser";
import { useSession } from "next-auth/react";
import { onboardingStore } from "../onboardingStore";

interface PersonalizeFormInputs {
  positions: number[];
  interests: number[];
}

export const usePersonalize = () => {
  const { formData, resetForm } = onboardingStore();
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalizeFormInputs>({
    defaultValues: {
      positions: formData.positions,
      interests: formData.interests,
    },
  });

  const [interests, setInterests] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interestsData = await getInterests();
        setInterests(interestsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch interests or positions");
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<PersonalizeFormInputs> = async (data) => {
    setSubmissionError(null);
    try {
      const updatedData = {
        ...formData,
        positions: data.positions,
        interests: data.interests,
      };
      if (user?.token && user?.id) {
        await updateUser(updatedData, user.token, user.id);
        update({}); // update user data
        resetForm();
        router.push("/"); // Redirect to a success page or wherever appropriate
      } else {
        setSubmissionError("User token or ID is missing");
      }
      update({}); // update user data
      resetForm();
      router.push("/"); // Redirect to a success page or wherever appropriate
    } catch (err: any) {
      setSubmissionError(err.message || "Failed to update user information");
    }
  };

  return {
    control,
    interests,
    positions,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    submissionError,
  };
};
