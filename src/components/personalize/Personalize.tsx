"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import usePersonalize from "@/hooks/usePersonalize";
import { OnboardingVideo } from "../profile-info";
import Icons from "../icons/Icons";
import FullPositionComponent from "./FullPositionComponent";
import FullInterestsComponent from "./FullInterestsComponent";

const Personalize = ({ positions, interests }) => {
  const {
    userPositions,
    setUserPositions,
    userInterests,
    setUserInterests,
    handleAllSet,
    openVideo,
    setOpenVideo,
  } = usePersonalize();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-x-36 flex-wrap justify-center items-center max-w-7xl">
        {/* Introduction and Onboarding Video Section */}
        <div className=" flex-1">
          <p className=" text-slate-400 text-base font-normal">
            <span className=" text-aqua-500">2/2</span> Customize Experience
          </p>
          <h1 className=" text-6xl text-white font-medium mb-3">
            Personalize Your Experience
          </h1>
          <p className=" text-slate-400 mb-28">
            Let's personalize your experience on Dipzin. Please answer a few
            questions about your interests and preferences.
            <br />
            <br />
            <br />
            <br />
            As always, your privacy is important to us, so please review our
            privacy policy and terms of service before proceeding.
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
            <div className="absolute top-1/2 left-1/2 -translate-x-[325%] flex justify-center items-center flex-col -translate-y-full">
              <Icons.PlayVideo className=" w-9 h-9" />
              <p className="text-xs font-medium text-left text-aqua-100">
                Play Video
              </p>
            </div>
          </div>
        </div>

        {/* Position and Interests Section */}
        <div className="flex-1">
          <p className=" text-slate-300">Which best describes you?</p>
          <FullPositionComponent
            positions={positions}
            userPositions={userPositions}
            setUserPositions={setUserPositions}
          />
          <div className=" pt-9">
            <h3 className=" text-slate-300 mb-1 text-base font-normal">
              Interests
            </h3>
            <p className=" text-slate-500 mb-4">
              Help us develop and prioritize features, and customize your
              experience.
            </p>
            <FullInterestsComponent
              interests={interests}
              userInterests={userInterests}
              setUserInterests={setUserInterests}
            />
            <div className="flex justify-between items-center mt-8">
              <Link href="/">
                <span className="text-slate-400">Skip</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/profile/profile-informations">
                  <span className="py-3 px-9 bg-slate-800 text-slate-500 rounded-lg">
                    Back
                  </span>
                </Link>
                <button
                  onClick={handleAllSet}
                  className="py-3 px-9 bg-gradient-to-tr from-aqua-400 to-aqua-600 text-aqua-950 font-medium rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OnboardingVideo openVideo={openVideo} setOpenVideo={setOpenVideo} />
    </motion.div>
  );
};

export default Personalize;
