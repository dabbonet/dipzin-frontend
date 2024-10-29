"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { updateUserProfile } from "../_actions/updateUserProfile";
import { updateUserNewsletters } from "../_actions/updateUserNewsletters";

type FormData = {
  name: string;
  username: string;
  file: FileList;
  newsletters: number[];
};

export const useProfileInformation = (
  initialUserDetails: any,
  newsletters: any[]
) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: initialUserDetails?.name || "",
      username: initialUserDetails?.username || "",
      newsletters: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      await Promise.all([
        updateUserProfile(formData),
        updateUserNewsletters(data.newsletters),
      ]);

      toast({
        title: "Success",
        description: "Your profile has been updated.",
        variant: "default",
      });

      router.push("/profile/personalize");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "error",
      });

      // Ensure the router pushes to the profile page even if there's an error
      router.push("/profile/personalize");
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    watch,
    setValue,
    newsletters,
  };
};
