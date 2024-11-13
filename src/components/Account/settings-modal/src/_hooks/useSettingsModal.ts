"use client"

import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { updateUser } from "@/actions/updateUser";
import { toast } from "@/hooks/use-toast";

export const useSettingsModal = () => {
  const { data: session, update } = useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username?.replace("@", "") || "",
      avatar: undefined as FileList | undefined,
      // title: user?.title || "",
      // bio: user?.bio || "",
      email: user?.email || "",
    },
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const uploadedFile = watch("avatar");

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        name: data.name,
        username: data.username,
        title: data.title,
        bio: data.bio,
        avatar: data.avatar ? data.avatar[0] : null,
      };
      if (user?.token && user?.id) {
        await updateUser(updatedData, user.token, user.id);
        await update({}); // Refresh session data
        toast({
          title: "Success",
          description: "Your profile has been updated.",
          variant: "success",
        });
      } else {
        throw new Error("User token or ID is missing");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "error",
      });
    }
  };

  const handleAvatarClick = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    // Fetch and set the avatar file
    (async () => {
      try {
        const response = await fetch(avatarUrl);
        const blob = await response.blob();
        const fileName = avatarUrl.substring(avatarUrl.lastIndexOf("/") + 1);
        const file = new File([blob], fileName, { type: blob.type });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        setValue("avatar", dataTransfer.files, { shouldDirty: true });
      } catch (err: any) {
        console.error("Error fetching avatar image:", err);
      }
    })();
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.avatar && value.avatar.length > 0) {
        setSelectedAvatar(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    user,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    selectedAvatar,
    uploadedFile,
    handleAvatarClick,
  };
};
