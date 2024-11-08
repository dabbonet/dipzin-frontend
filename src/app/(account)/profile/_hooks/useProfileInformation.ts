"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getNewsletters } from "../_actions/getNewsletters";
import { useEffect, useState } from "react";
import { onboardingStore } from "../onboardingStore";

interface ProfileInformationFormInputs {
  name: string;
  username: string;
  file: FileList;
  newsletters: number[];
}

export const useProfileInformation = () => {
  const { setFormData } = onboardingStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileInformationFormInputs>({
    defaultValues: {
      name: "",
      username: "",
      newsletters: [],
    },
  });

  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const data = await getNewsletters();
        setNewsletters(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch newsletters");
      }
    };
    fetchNewsletters();
  }, []);

  const onSubmit: SubmitHandler<ProfileInformationFormInputs> = (data) => {
    const {
      name, username, file, newsletters: selectedNewsletters,
    } = data;
    const avatar = file && file[0] ? file[0] : undefined;

    setFormData({
      name,
      username,
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
  };
};
