"use client";

import { Button } from "@/components/Shared/button";
import {
  Card, CardContent, CardFooter, CardHeader
} from "@/components/UI/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/UI/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Shared/avatar";
import Image from "next/image";
import { Input } from "@/components/Shared/input";
import { DialogClose } from "@/components/UI/dialog";
import { useSettingsModal } from "./_hooks/useSettingsModal";
import { Dropdown } from "@/components/Shared/dropdown";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { storage } from "@/utils/storage";

const avatars = [
  "/assets/avatars/avatar-1.png",
  "/assets/avatars/avatar-2.png",
  "/assets/avatars/avatar-3.png",
  "/assets/avatars/avatar-4.png",
  "/assets/avatars/avatar-5.png",
];

const SettingsModal = () => {
  const {
    user,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    selectedAvatar,
    uploadedFile,
    handleAvatarClick,
  } = useSettingsModal();

  return (
    <Card className="bg-slate-900 border-4 border-[#171f31] rounded-[20px] p-6 text-white font-outfit">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <CardHeader className="w-full flex flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-white text-2xl">Account Information</h1>
              <p className="text-sm font-medium text-slate-300">
                Here you can view and edit your account information
              </p>
            </div>
            <TabsList>
              <TabsTrigger className="py-2 px-2.5 text-white" value="account-settings">
                Account Settings
              </TabsTrigger>
              <TabsTrigger className="py-2 px-2.5 text-white" value="membership">
                Membership
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="account-settings">
              <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                <div>
                  <p className="text-slate-400 text-base">Profile Picture</p>
                  <div className="flex items-center gap-x-2 overflow-x-scroll scrollbar-hide">
                    {avatars.map((avatar) => (
                      <Avatar
                        key={avatar}
                        className={`size-[64px] cursor-pointer ${
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
                              (user.avatar?.hash ?? "") + (user.avatar?.ext ?? ""),
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
                  className="py-5 w-full"
                  placeholder="Enter your full name"
                  label="Full Name"
                  required
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-danger-400">{errors.name.message}</p>}

                <Input
                  className="py-5 w-full"
                  placeholder="Enter your username"
                  label="Username"
                  startContent={<span className="text-slate-500">@</span>}
                  required
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <p className="text-danger-400">{errors.username.message}</p>}

                <Input
                  className="py-5 w-full"
                  placeholder="Enter your email"
                  label="Email"
                  disabled
                  value={user?.email || ""}
                />

                <Input
                  className="py-5 w-full"
                  placeholder="Select your role"
                  label="Role"
                  disabled
                  // {...register("title")}
                />

                <Input
                  className="py-5 w-full"
                  placeholder="Write a bio about yourself"
                  label="Bio"

                  // {...register("bio")}
                />
                <Dropdown
                  trigger={
                    <Input className="py-5 w-full" placeholder="ex:US213A" label="country" disabled name="country" />
              }
                  content={
                    <p>content</p>
              }
                />
              </div>
            </TabsContent>
            <TabsContent value="membership">
              {/* Membership content */}
            </TabsContent>
          </CardContent>
        </Tabs>
        <CardFooter className="flex justify-between">
          <button type="button" className="text-[#C9FFED] text-sm">
            Need help?
          </button>
          <div className="flex items-center gap-2.5">
            <DialogClose asChild>
              <Button variant="darkGray" size="xl">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="xl" disabled={!isDirty}>
              Save Updates
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsModal;
