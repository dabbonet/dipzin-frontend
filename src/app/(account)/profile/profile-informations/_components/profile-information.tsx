"use client";

import { Button } from "@/components/Shared/button";
import { Input } from "@/components/Shared/input";
import { Checkbox } from "@/components/UI/checkbox";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProfileInformation } from "../_hooks/useProfileInformation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Shared/avatar";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { Label } from "@/components/UI/label";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function ProfileInformation({
  newsletters,
  initialUserDetails,
}: {
  newsletters: any[];
  initialUserDetails: any;
}) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    setValue,
    watch,
  } = useProfileInformation(initialUserDetails, newsletters);

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars = [
    "/images/assets/manager.png",
    "/images/assets/manager2.png",
    "/images/assets/manager3.png",
    "/images/assets/manager4.png",
    "/images/assets/manager5.png",
    "/images/assets/manager6.png",
  ];

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    setValue("file", new DataTransfer().files); // Clear any uploaded file
  };

  const uploadedFile = watch("file");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-x-36 flex-wrap justify-center items-center">
        <div className="flex-1">
          <p className="text-slate-400 text-base font-normal">
            <span className="text-aqua-500">1/2</span>
            {' '}
            Basic Info
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-3">
            Let’s set up your account.
          </h1>
          <p className="text-slate-400 mb-8">
            Let&quot;s get to know you better! Your privacy is important to us, so
            please take a moment to review our
            {' '}
            <Link className="text-white font-medium underline" href="/legal/privacy-policy">privacy policy</Link>
            {' '}
            and
            {' '}
            <Link className="text-white font-medium underline" href="/legal/terms-of-service">terms of service</Link>
            {' '}
            before getting started.
          </p>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=9clRNqVT2-I"
            width="100%"
            height="100%"
            className="hidden lg:flex aspect-video overflow-hidden size-full rounded-2xl relative cursor-pointer transition-shadow duration-300 shadow-[0_0_30px_20px_rgba(0,52,46,0.3)] hover:shadow-[0_0_30px_20px_rgba(0,92,80,0.2)]"
            controls
          />
        </div>

        <div className="flex-1 w-full lg:w-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      "cursor-pointer bg-slate-800 border-2 border-dotted border-slate-600 rounded-2xl overflow-hidden",
                      selectedAvatar === avatar
                        ? "border-cyan-500"
                        : "border-transparent"
                    )}
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    <AvatarImage
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
              <div className="bg-slate-800 p-1 border border-dotted border-slate-600 rounded-2xl">
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
                <Label htmlFor="file" className="text-sm text-white">Upload a Profile Picture</Label>
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
                type="default"
                placeholder="Full Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
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
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">Username is required</p>
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
                {newsletters?.map((newsletter: any) => (
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
                                  (id: number) => id !== newsletter.id
                                )
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
                      {newsletter.attributes.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-x-4">
              <Button type="submit" size="lg">
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
