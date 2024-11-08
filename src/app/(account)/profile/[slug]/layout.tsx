"use client";

import { Logo } from "@/components/UI/logo";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import type { FC } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

const ProfileContent: FC<{ slug: string }> = ({ slug }) => {
  switch (slug) {
    case "profile-information":
      return (
        <>
          <p className="text-slate-400 text-base font-normal">
            <span className="text-aqua-500">1/2</span>
            {' '}
            Basic Info
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-3">
            Let’s set up your account.
          </h1>
          <p className="text-slate-400 mb-8">
            Let&apos;s get to know you better! Please review our
            {" "}
            <Link
              href="/legal/privacy-policy"
              className="text-white font-medium underline"
            >
              privacy policy
            </Link>
            {" "}
            and
            {" "}
            <Link
              href="/legal/terms-of-service"
              className="text-white font-medium underline"
            >
              terms of service
            </Link>
            {" "}
            before getting started.
          </p>
        </>
      );
    case "personalize":
      return (
        <>
          <p className="text-slate-400 text-base font-normal">
            <span className="text-aqua-500">2/2</span>
            {' '}
            Customize Experience
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-3">
            Personalize Your Experience
          </h1>
          <p className="text-slate-400 mb-8">
            Please answer a few questions about your interests and preferences.
            Review our
            {" "}
            <Link
              href="/legal/privacy-policy"
              className="text-white font-medium underline"
            >
              privacy policy
            </Link>
            {" "}
            and
            {" "}
            <Link
              href="/legal/terms-of-service"
              className="text-white font-medium underline"
            >
              terms of service
            </Link>
            {" "}
            before proceeding.
          </p>
        </>
      );
    default:
      return null;
  }
};

const ProfileLayout: FC<ProfileLayoutProps> = ({ children, params }) => {
  const { slug } = params;

  return (
    <main className="flex flex-col gap-2 px-4 pt-5 md:px-8 md:pt-7">
      <Logo.Dipzin className="flex mr-auto" />
      <div className="flex size-full items-center justify-center px-[10vw] py-[2.5vw]">
        <div className="flex gap-x-36 flex-wrap justify-center items-center w-full">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ProfileContent slug={slug} />
            <ReactPlayer
              url="https://www.youtube.com/watch?v=9clRNqVT2-I"
              width="100%"
              height="100%"
              className="hidden bg-black-950 lg:flex aspect-video overflow-hidden size-full rounded-2xl relative cursor-pointer transition-shadow duration-300 shadow-[0_0_30px_20px_rgba(0,52,46,0.3)] hover:shadow-[0_0_30px_20px_rgba(0,92,80,0.2)]"
              controls
            />
          </motion.div>
          <motion.div
            className="flex-1 w-full lg:w-auto"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
