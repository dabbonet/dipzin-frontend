"use client";

import { Button } from "@/components/Shared/button";
import { Input } from "@/components/Shared/input";
import { Checkbox } from "@/components/UI/checkbox";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Shared/avatar";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { Label } from "@/components/UI/label";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProfileInformation } from "../_hooks/useProfileInformation";
import { Skeleton } from "@/components/UI/skeleton";
import { toast } from "@/hooks/use-toast";

export default function ProfileInformation() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    newsletters,
    error,
    setValue,
    watch,
    getValues,
  } = useProfileInformation();

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  const avatars = [
    "/assets/avatars/avatar-1.png",
    "/assets/avatars/avatar-2.png",
    "/assets/avatars/avatar-3.png",
    "/assets/avatars/avatar-4.png",
    "/assets/avatars/avatar-5.png",
  ];

  const uploadedFile = watch("avatar");
  const name = watch("name");

  useEffect(() => {
    if (!isUsernameChanged && name) {
      setValue("username", name);
    }
  }, [name, isUsernameChanged, setValue]);

  const handleAvatarClick = useCallback(
    (avatar: string) => {
      setSelectedAvatar(avatar);
      (async () => {
        try {
          const response = await fetch(avatar);
          const blob = await response.blob();
          const fileName = avatar.substring(avatar.lastIndexOf("/") + 1);
          const file = new File([blob], fileName, { type: blob.type });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          setValue("avatar", dataTransfer.files);
        } catch (err: any) {
          throw new Error(`Error fetching avatar image: ${err.message}`);
        }
      })();
    },
    [setSelectedAvatar, setValue],
  );

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.avatar && value.avatar.length > 0) {
        setSelectedAvatar(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleUsernameChange = () => {
    setIsUsernameChanged(true);
  };

  // Logic for handling "No Emails" selection
  const noEmailsNewsletter = newsletters.find(
    (newsletter) => newsletter.name === "No Emails"
  );

  const handleNewsletterChange = useCallback(
    (newsletterId, checked) => {
      let selectedNewsletters = getValues("newsletters");
      if (checked) {
        if (
          noEmailsNewsletter
          && newsletterId === noEmailsNewsletter.id
        ) {
          // If "No Emails" is selected, unselect all others
          selectedNewsletters = [newsletterId];
        } else {
          // Remove "No Emails" if it's selected
          selectedNewsletters = selectedNewsletters.filter(
            (id) => id !== noEmailsNewsletter?.id
          );
          selectedNewsletters.push(newsletterId);
        }
      } else {
        selectedNewsletters = selectedNewsletters.filter(
          (id) => id !== newsletterId
        );
      }
      setValue("newsletters", selectedNewsletters);
    },
    [getValues, setValue, noEmailsNewsletter],
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "error",
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Profile Picture Section */}
      <div className="mb-5">
        <p className="text-slate-300 text-base font-normal">
          Profile Picture
        </p>
        {/* Predefined Avatars */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-3">
          {avatars.map((avatar, index) => (
            <Avatar
              key={avatar}
              size="large"
              className={cn(
                "cursor-pointer size-22 bg-slate-800 border-2 border-dotted border-slate-600 rounded-2xl",
                selectedAvatar === avatar
                  ? "border-cyan-500"
                  : "border-transparent",
              )}
              onClick={() => handleAvatarClick(avatar)}
            >
              <AvatarImage
                className="z-10"
                src={avatar}
                alt={`Avatar ${index + 1}`}
              />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* Upload Custom Profile Picture */}
      <div className="flex gap-4 my-4">
        <div className="size-fit bg-slate-800 p-1 border border-dotted border-slate-600 rounded-2xl">
          <div className="bg-slate-700 size-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
            <Label
              htmlFor="avatar"
              className="size-full cursor-pointer flex justify-center items-center relative z-50"
            >
              {uploadedFile && uploadedFile[0] && (
                <Image
                  src={URL.createObjectURL(uploadedFile[0])}
                  alt="Uploaded Avatar"
                  width={56}
                  height={56}
                  className="object-cover size-full"
                />
              )}
              {!uploadedFile && selectedAvatar && (
                <Image
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  width={56}
                  height={56}
                  className="object-cover size-full"
                />
              )}
              {uploadedFile?.length < 1 && !selectedAvatar && (
                <PhotoIcon className="text-slate-900 size-6" />
              )}
            </Label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar"
              {...register("avatar")}
              onClick={() => setSelectedAvatar(null)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Label htmlFor="avatar" className="text-sm text-white">
            Upload a Profile Picture
          </Label>
          <p className="text-slate-600 text-sm">
            Supported formats: jpg, png. Maximum size: 2MB
          </p>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      {/* Name Input */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label required htmlFor="name" className="text-slate-300">
          Name
        </Label>
        <Input
          required
          id="name"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Username Input */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label required htmlFor="username" className="text-slate-300">
          Username
        </Label>
        <Input
          required
          className="gap-[2px]"
          id="username"
          placeholder="username"
          startContent={
            <span className="text-slate-500">@</span>
          }
          {...register("username", { required: "Username is required" })}
          onChange={handleUsernameChange}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Newsletters */}
      <div className="mb-4">
        <Label required className="text-slate-300">
          Notifications
        </Label>
        <p className="text-slate-500 font-medium text-xs">
          Choose the types of notifications you want to receive
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {newsletters.length > 0
            ? newsletters.map((newsletter: any) => (
              <div key={newsletter.id} className="flex items-center">
                <Controller
                  name="newsletters"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`newsletter-${newsletter.id}`}
                      checked={field.value.includes(newsletter.id)}
                      onCheckedChange={(checked) => handleNewsletterChange(newsletter.id, checked)}
                    />
                  )}
                />
                <Label
                  htmlFor={`newsletter-${newsletter.id}`}
                  className="ml-2 text-slate-300"
                >
                  {newsletter.name}
                </Label>
              </div>
            ))
            : Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="w-full h-6 rounded bg-slate-800"
              />
            ))}
        </div>
        {errors.newsletters && (
          <p className="text-red-500 text-sm mt-2">
            {errors.newsletters.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-x-4">
        <Button type="submit" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
}
