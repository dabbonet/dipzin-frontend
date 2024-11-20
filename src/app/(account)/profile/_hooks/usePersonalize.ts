"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { getInterests } from "../_actions/getInterests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import positions from "../_static/positions.json";
import { updateUser } from "@/actions/updateUser";
import { useSession } from "next-auth/react";
import { onboardingStore } from "../onboardingStore";
import { toast } from "@/hooks/use-toast";

interface PersonalizeFormInputs {
  positions: number[];
  interests: number[];
}

export const usePersonalize = () => {
  const { formData, setFormData, resetForm } = onboardingStore();
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalizeFormInputs>({
    defaultValues: {
      positions: formData.positions || [],
      interests: formData.interests || [],
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
        setError("Failed to fetch interests");
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<PersonalizeFormInputs> = async (data) => {
    setSubmissionError(null);

    if (data.positions.length === 0) {
      setError("Please select at least one position.");
      return;
    }
    if (data.interests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }

    setFormData({
      positions: data.positions,
      interests: data.interests,
    });

    try {
      const updatedData = {
        ...formData,
        positions: data.positions,
        interests: data.interests,
      };
      if (user?.token && user?.id) {
        await updateUser(updatedData, user.token, user.id);
      } else {
        setSubmissionError("User token or ID is missing");
        return;
      }
      update({});
      resetForm();
      toast({
        title: "Success",
        description: "User information updated",
        variant: "success",
      });
      router.push("/profile/enjoy");
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
