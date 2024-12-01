"use client";

import React, { useState } from "react";
import { Button } from "@/components/Shared/button";
import {
  Card, CardContent, CardFooter, CardHeader
} from "@/components/UI/card";
import { Input } from "@/components/Shared/input";
import { DialogClose } from "@/components/UI/dialog";
import { useSettingsModal } from "./_hooks/useSettingsModal";
import { Dropdown } from "@/components/Shared/dropdown";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Shared/avatar";
import Image from "next/image";
import { storage } from "@/utils/storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  TabsList, TabsTrigger,
  Tabs,
  TabsContent
} from "@/components/UI/tabs";
import Membership from "./membership";

const avatars = [
  "/assets/avatars/avatar-1.png",
  "/assets/avatars/avatar-2.png",
  "/assets/avatars/avatar-3.png",
  "/assets/avatars/avatar-4.png",
  "/assets/avatars/avatar-5.png",
];

const MobileSettingsModal = () => {
  const {
    user,
    register,
    handleSubmit,
    onSubmit,
    handleAvatarClick,
    selectedAvatar,
    uploadedFile,
    errors,
    isDirty,
  } = useSettingsModal();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["profile", "details"];
  const [tabValue, setTabValue] = useState('account-settings');

  const onDotButtonClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      // Swipe Left
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else if (offset > 50 || velocity > 500) {
      // Swipe Right
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  return (
    <Card className="bg-slate-900 border-4 border-[#171f31] rounded-[20px] text-white h-[80vh] w-[90vw] flex items-center justify-between mx-auto flex-col overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={tabValue} onValueChange={setTabValue} className="flex flex-col items-center justify-center size-full">
          <CardHeader className="w-full flex flex-col items-center justify-between gap-2 pb-2">
            <TabsList className="p-1 rounded-xl">
              <TabsTrigger className="py-1.5 px-2 rounded-lg text-white" value="account-settings">
                Account Settings
              </TabsTrigger>
              <TabsTrigger className="py-1.5 px-2 rounded-lg text-white" value="membership">
                Membership
              </TabsTrigger>
            </TabsList>
            {tabValue === 'account-settings' ? (
              <div className="text-center">
                <h1 className="text-white text-2xl">Account Information</h1>
                <p className="text-sm font-medium text-slate-300">
                  Here you can view and edit your account information
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-white text-2xl">Manage Membership Plan</h1>
                <p className="text-sm font-medium text-slate-300">
                  Easily upgrade, downgrade, or cancel your membership plan
                </p>
              </div>
            )}
          </CardHeader>
          <TabsContent className="size-full" value="account-settings">
            {/* Dot Pagination */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type="button"
                    onClick={() => onDotButtonClick(index)}
                    className={`size-3 rounded-full ${
                      index === currentStep ? "bg-aqua-600" : "bg-slate-600"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <CardContent className="w-full flex-1 mt-4" style={{ minHeight: "300px" }}>
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                >
                  <div>
                    <p className="text-slate-400 text-base">Profile Picture</p>
                    <div className="flex items-center gap-x-2 overflow-x-scroll scrollbar-hide">
                      {avatars.map((avatar) => (
                        <Avatar
                          key={avatar}
                          className={`size-[56px] cursor-pointer ${
                            selectedAvatar === avatar ? "ring-2 ring-blue-500" : ""
                          }`}
                          onClick={() => handleAvatarClick(avatar)}
                          radius="square"
                        >
                          <AvatarImage src={avatar} alt="avatar" />
                          <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="bg-slate-800 p-1 h-fit border border-dotted border-slate-600 cursor-pointer rounded-2xl">
                      <div className="bg-slate-700 size-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
                        <label
                          htmlFor="avatar-upload"
                          className="size-full cursor-pointer flex justify-center items-center relative z-50"
                        >
                          {uploadedFile && uploadedFile.length > 0 ? (
                            <Image
                              src={uploadedFile && uploadedFile[0] ? URL.createObjectURL(uploadedFile[0]) : ""}
                              width={58}
                              height={58}
                              alt="Uploaded Avatar"
                              className="size-full object-cover"
                            />
                          ) : (
                            <PhotoIcon className="text-slate-900 size-6" />
                          )}
                          {!uploadedFile && user?.avatar && (
                          <Image
                            src={storage(
                              (user.avatar?.hash ?? "") + (user.avatar?.ext ?? "")
                            )}
                            width={58}
                            height={58}
                            alt="Current Avatar"
                            className="size-full object-cover"
                          />
                          )}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="avatar-upload"
                          {...register("avatar")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center self-center">
                      <p className="text-sm text-white">Upload a Profile Picture</p>
                      <p className="text-slate-600 text-sm">
                        Supported formats: jpg, png (max size: 2MB)
                      </p>
                    </div>
                  </div>

                  <Input
                    placeholder="Enter your full name"
                    label="Full Name"
                    required
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                  <p className="text-danger-400">{errors.name.message}</p>
                  )}

                  <Input
                    placeholder="Enter your username"
                    label="Username"
                    startContent={<span className="text-slate-500">@</span>}
                    required
                    {...register("username", { required: "Username is required" })}
                  />
                  {errors.username && (
                  <p className="text-danger-400">{errors.username.message}</p>
                  )}
                </motion.div>
                )}
                {currentStep === 1 && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 size-full"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                >
                  <Input
                    placeholder="Enter your email"
                    label="Email"
                    disabled
                    value={user?.email || ""}
                  />

                  <Input
                    placeholder="Select your role"
                    label="Role"
                    disabled
                  />

                  <Input
                    placeholder="Write a bio about yourself"
                    label="Bio"
                    {...register("bio")}
                  />

                  <Dropdown
                    trigger={(
                      <Input
                        placeholder="ex:US213A"
                        className="h-10"
                        label="Country"
                        disabled
                        name="country"
                      />
                  )}
                    content={<p>content</p>}
                  />
                </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="w-full flex pb-0 items-center">
              <DialogClose asChild>
                <Button fullWidth className="flex-1" variant="ghost" size="lg">
                  Cancel
                </Button>
              </DialogClose>
              {currentStep === 0 ? (
                <Button
                  fullWidth
                  className="flex-1"
                  size="lg"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button fullWidth className="flex-1" type="submit" size="lg" disabled={!isDirty}>
                  Save
                </Button>
              )}
            </CardFooter>
          </TabsContent>
          <TabsContent value="membership">
            <CardContent className="w-full pb-2.5 flex-1">
              <Membership />
            </CardContent>
            <CardFooter className="w-full flex py-0 items-center">
              <DialogClose asChild>
                <Button fullWidth className="flex-1" variant="ghost" size="lg">
                  Close
                </Button>
              </DialogClose>
              <Button fullWidth href="/pricing" className="flex-1" type="submit" size="lg">
                Compare All Plans
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </form>
    </Card>
  );
};

export default MobileSettingsModal;
