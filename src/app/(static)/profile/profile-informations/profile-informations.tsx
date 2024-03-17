"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Icons from "../../../../components/icons/Icons"; // Adjust the path as needed
import { useProfileInformation } from "@/hooks/useProfileInformation";
import { OnboardingVideo, UserDetailsForm } from "@/components/profile-info";

const ProfileInformation = ({ newsLetter }) => {
  const {
    userDetails,
    setUserDetails,
    profileUpdated,
    setProfileUpdated,
    newsLetterUpdated,
    setNewsLetterUpdated,
    openVideo,
    setOpenVideo,
    userArr,
    setUserArr,
    handleChange,
    addNewsLetter,
    submitForm,
    router,
  } = useProfileInformation(newsLetter);

  // Side effect for redirecting after profile update
  useEffect(() => {
    if (profileUpdated && newsLetterUpdated) {
      router.push("/profile/personalize");
    }
  }, [profileUpdated, newsLetterUpdated, router]);

  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex w-full h-full gap-x-36 flex-wrap justify-center items-center max-w-5xl">
        {/* Basic Info and Onboarding Video Section */}
        <div className=" flex-1">
          <p className=" text-slate-400 text-base font-normal">
            <span className=" text-aqua-500">1/2</span> Basic Info
          </p>
          <h1 className=" text-6xl text-white font-medium mb-3">
            Let’s setup your account.
          </h1>
          <p className=" text-slate-400 mb-28">
            Let's get to know you better! Your privacy is important to us, so
            please take a moment to review our{" "}
            <a href="https://google.com" className=" text-slate-100 underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="https://google.com" className=" text-slate-100 underline">
              terms of service
            </a>
            before getting started.{" "}
          </p>
          <div
            className=" relative cursor-pointer "
            onClick={() => setOpenVideo(true)}
          >
            <p className=" text-slate-400 text-xs">Onboarding Video</p>
            <img
              src="/images/assets/profile-steper-video-screen.svg"
              className=" -mt-14 -ml-20"
              alt=""
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-[200%] flex justify-center items-center flex-col -translate-y-full">
              <Icons.PlayVideo className=" w-9 h-9" />
              <p className="text-xs font-medium text-left text-aqua-100">
                Play Video
              </p>
            </div>
          </div>
        </div>

        {/* User Details Form Section */}
        <div className="flex-1">
          <div className=" flex-1">
            <div className=" mb-5">
              <p className=" text-slate-300 text-base font-normal">
                Profile Picture
              </p>
              <div className=" grid grid-cols-6 gap-x-2">
                <img
                  src="/images/assets/manager.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
                <img
                  src="/images/assets/manager2.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
                <img
                  src="/images/assets/manager3.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
                <img
                  src="/images/assets/manager4.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
                <img
                  src="/images/assets/manager5.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
                <img
                  src="/images/assets/manager6.png"
                  id="image"
                  onClick={handleChange}
                  className=" cursor-pointer"
                  alt="image"
                />
              </div>
            </div>
          </div>
          <UserDetailsForm
            userDetails={userDetails}
            onChange={handleChange}
            onSubmit={submitForm}
            newsLetter={newsLetter}
            userArr={userArr}
            addNewsLetter={addNewsLetter}
          />
        </div>
      </div>

      {/* Onboarding Video Modal */}
      <OnboardingVideo openVideo={openVideo} setOpenVideo={setOpenVideo} />
    </motion.div>
  );
};

export default ProfileInformation;
