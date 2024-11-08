"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getNewsletters } from "../_actions/getNewsletters";
import { useEffect, useState } from "react";
import { onboardingStore } from "../onboardingStore";

interface ProfileInformationFormInputs {
  name: string;
  username: string;
  avatar: FileList;
  newsletters: number[];
}

export const useProfileInformation = () => {
  const { formData, setFormData } = onboardingStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<ProfileInformationFormInputs>({
    defaultValues: {
      name: formData.name || "",
      username: formData.username || "",
      newsletters: formData.system_news_letters || [],
      avatar: undefined,
    },
  });

  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const data = await getNewsletters();
        // Default select all newsletters except "No Emails"
        const defaultNewsletters = data
          .filter((newsletter: any) => newsletter.name !== "No Emails")
          .map((newsletter: any) => newsletter.id);
        setNewsletters(data);
        setValue("newsletters", formData.system_news_letters.length ? formData.system_news_letters : defaultNewsletters);
        setFormData({ system_news_letters: formData.system_news_letters.length ? formData.system_news_letters : defaultNewsletters });
      } catch (err: any) {
        setError("Failed to fetch newsletters");
      }
    };
    fetchNewsletters();
  }, [setValue, setFormData, formData.system_news_letters]);

  const onSubmit: SubmitHandler<ProfileInformationFormInputs> = (data) => {
    const {
      name, username, avatar: selectedAvatar, newsletters: selectedNewsletters,
    } = data;
    const avatar = selectedAvatar && selectedAvatar[0] ? selectedAvatar[0] : undefined;

    // Check if avatar is selected
    if (!avatar) {
      setError("Please select an avatar or upload a profile picture.");
      return;
    }

    // Check if at least one newsletter is selected
    if (newsletters.length === 0) {
      setError("Please select at least one newsletter.");
      return;
    }

    setFormData({
      name,
      username: `@${username}`,
      avatar,
      system_news_letters: selectedNewsletters,
    });

    router.push("/profile/personalize");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    newsletters,
    error,
    setValue,
    watch,
    getValues,
  };
};
