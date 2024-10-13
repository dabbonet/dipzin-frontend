'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/Shared/button";
import { Skeleton } from "@/components/UI/skeleton";
import positionsData from "./_static/positions.json";
import { Controller } from "react-hook-form";
import type { FC } from "react";
import { Checkbox } from "@/components/UI/checkbox";
import Image from "next/image";
import { usePersonalize } from "./_hooks/usePersonalize";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Position: FC<{ id: number; name: string; icon: string; control: any }> = ({
  id, name, icon, control
}) => (
  <label htmlFor={id.toString()} className="flex items-center justify-start gap-4 bg-slate-900 py-2 px-3 rounded-xl">
    <Controller
      name={`positions.${id}`}
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          id={id.toString()}
          checked={field.value}
          onCheckedChange={(checked) => field.onChange(checked)}
        />
      )}
    />
    <span className="w-9 flex justify-center items-center bg-slate-800 border border-solid border-cyan-700 rounded-xl overflow-hidden p-1.5 aspect-square">
      <Image src={icon} alt={name} width={50} height={50} />
    </span>
    {name}
  </label>
);

const Interest: FC<{ title: string; id: number; selected: boolean; toggleInterest: () => void }> = ({
  title, id, selected, toggleInterest
}) => (
  <button
    key={id}
    type="button"
    className={`text-slate-200 text-sm py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border ${selected ? 'border-cyan-600' : 'border-transparent'}`}
    onClick={toggleInterest}
  >
    {title}
  </button>
);

export default function PersonalizePage() {
  const {
    control, interests, userInterests, toggleInterest, onSubmit
  }: {
    control: any;
    interests: { data: { id: number; attributes: { name: string } }[] };
    userInterests: number[];
    toggleInterest: (id: number) => void;
    onSubmit: (data: any) => Promise<void>;
  } = usePersonalize();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="size-full flex flex-col lg:flex-row gap-28 justify-center items-center">
      <div className="flex-[0.45] size-full">
        <p className="text-slate-400 text-base font-normal">
          <span className="text-aqua-500">2/2</span>
          {' '}
          Customize Experience
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-3">Personalize Your Experience</h1>
        <p className="text-slate-400 mb-8">
          Let&apos;s personalize your experience on Dipzin. Please answer a few questions about your interests and preferences.
          <br />
          <br />
          As always, your privacy is important to us, so please review our
          {' '}
          <Link className="text-white font-medium underline" href="/legal/privacy-policy">privacy policy</Link>
          {' '}
          and
          {' '}
          <Link className="text-white font-medium underline" href="/legal/terms-of-service">terms of service</Link>
          {' '}
          before proceeding.
        </p>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=9clRNqVT2-I"
          width="100%"
          height="100%"
          className="hidden lg:flex aspect-video overflow-hidden size-full rounded-2xl relative cursor-pointer transition-shadow duration-300 shadow-[0_0_30px_20px_rgba(0,52,46,0.3)] hover:shadow-[0_0_30px_20px_rgba(0,92,80,0.2)]"
          controls
        />
      </div>
      <div className="flex-[0.55] w-full lg:w-auto">
        <p className="text-slate-300">Which best describes you?</p>
        <div className="grid grid-cols-2 mt-3 gap-4">
          {positionsData.map((position) => (
            <Position
              key={position.id}
              id={position.id}
              name={position.name}
              icon={position.icon}
              control={control}
            />
          ))}
        </div>
        <div className="mt-9">
          <h3 className="text-slate-300 mb-1 text-base font-normal">Interests</h3>
          <p className="text-slate-500 mb-4">Help us develop and prioritize features, and customize your experience.</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {interests ? (
              interests.data.map((el: { id: number; attributes: { name: string } }) => (
                <Interest
                  key={el.id}
                  id={el.id}
                  title={el.attributes.name}
                  selected={userInterests.includes(el.id)}
                  toggleInterest={() => toggleInterest(el.id)}
                />
              ))
            ) : (
              Array.from({ length: 10 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton key={index} className="w-36 h-10 rounded-xl bg-slate-800 " />
              ))
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button href="/" variant="ghost" className="rounded-full hover:bg-slate-800">Skip</Button>
            <div className="flex items-center gap-4">
              <Button href="/profile/profile-informations" variant="darkGray">Back</Button>
              <Button onClick={onSubmit}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
