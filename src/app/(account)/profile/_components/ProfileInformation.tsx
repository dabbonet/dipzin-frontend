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
import { useCallback, useState } from "react";
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
  } = useProfileInformation();

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars = [
    "/assets/avatars/avatar-1.png",
    "/assets/avatars/avatar-2.png",
    "/assets/avatars/avatar-3.png",
    "/assets/avatars/avatar-4.png",
    "/assets/avatars/avatar-5.png",
  ];

  const uploadedFile = watch("file");

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
          setValue("file", dataTransfer.files);
        } catch (err: any) {
          console.error("Error fetching avatar image:", err);
        }
      })();
    },
    [setSelectedAvatar, setValue],
  );

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "error",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Profile Picture Section */}
      <div className="mb-5">
        <p className="text-slate-300 text-base font-normal">Profile Picture</p>
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
              htmlFor="file"
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
              {!uploadedFile && !selectedAvatar && (
                <PhotoIcon className="text-slate-900 size-6" />
              )}
            </Label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file"
              {...register("file")}
              onClick={() => setSelectedAvatar(null)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Label htmlFor="file" className="text-sm text-white">
            Upload a Profile Picture
          </Label>
          <p className="text-slate-600 text-sm">
            Supported formats: jpg, png. Maximum size: 2MB
          </p>
        </div>
      </div>

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
          id="username"
          placeholder="@username"
          defaultValue="@"
          {...register("username", { required: "Username is required" })}
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
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, newsletter.id]);
                        } else {
                          field.onChange(
                            field.value.filter(
                              (id: number) => id !== newsletter.id,
                            ),
                          );
                        }
                      }}
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
      </div>

      {/* Display Error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit Button */}
      <div className="flex justify-end gap-x-4">
        <Button type="submit" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
}
