"use client";

import { Controller } from "react-hook-form";
import { Button } from "@/components/Shared/button";
import React, { type FC, useEffect } from "react";
import { Checkbox } from "@/components/UI/checkbox";
import Image from "next/image";
import { usePersonalize } from "../_hooks/usePersonalize";
import { Skeleton } from "@/components/UI/skeleton";
import { toast } from "@/hooks/use-toast";

const Position: FC<{
  id: number;
  name: string;
  icon: string;
  control: any;
}> = ({
  id, name, icon, control
}) => (
  <label
    htmlFor={id.toString()}
    className="flex items-center justify-start gap-4 bg-slate-900 py-2 px-3 rounded-xl"
  >
    <Controller
      name="positions"
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          id={id.toString()}
          checked={field.value.includes(id)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, id]);
            } else {
              field.onChange(
                field.value.filter((value: number) => value !== id),
              );
            }
          }}
        />
      )}
    />
    <span className="w-9 flex justify-center items-center bg-slate-800 border border-solid border-cyan-700 rounded-xl overflow-hidden p-1.5 aspect-square">
      <Image src={icon} alt={name} width={50} height={50} />
    </span>
    {name}
  </label>
);

const Interest: FC<{
  title: string;
  id: number;
  selected: boolean;
  toggleInterest: () => void;
}> = ({
  title, id, selected, toggleInterest
}) => (
  <button
    key={id}
    type="button"
    className={`text-slate-200 text-sm py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border ${
      selected ? "border-cyan-600" : "border-transparent"
    }`}
    onClick={toggleInterest}
  >
    {title}
  </button>
);

export default function Personalize() {
  const {
    control,
    interests,
    positions,
    handleSubmit,
    error,
    submissionError,
    errors,
  } = usePersonalize();

  useEffect(() => {
    if (error || submissionError) {
      toast({
        title: "Error",
        description: error || submissionError,
        variant: "error",
      });
    }
  }, [error, submissionError]);

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-slate-300">Which best describes you?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-4">
        {positions.length > 0
          ? positions.map((position) => (
            <Position
              key={position.id}
              id={position.id}
              name={position.name}
              icon={position.icon}
              control={control}
            />
          ))
          : Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="w-full h-14 rounded-xl bg-slate-800"
            />
          ))}
      </div>
      {errors.positions && (
        <p className="text-red-500 text-sm mt-2">
          {errors.positions.message}
        </p>
      )}
      <div className="mt-9">
        <h3 className="text-slate-300 mb-1 text-base font-normal">
          Interests
        </h3>
        <p className="text-slate-500 mb-4">
          Help us develop and prioritize features, and customize your
          experience.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {interests.length > 0
            ? interests.map((el: { id: number; name: string }) => (
              <Controller
                key={el.id}
                name="interests"
                control={control}
                render={({ field }) => (
                  <Interest
                    id={el.id}
                    title={el.name}
                    selected={field.value.includes(el.id)}
                    toggleInterest={() => {
                      if (field.value.includes(el.id)) {
                        field.onChange(
                          field.value.filter((id: number) => id !== el.id),
                        );
                      } else {
                        field.onChange([...field.value, el.id]);
                      }
                    }}
                  />
                )}
              />
            ))
            : Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="w-36 h-10 rounded-xl bg-slate-800 "
              />
            ))}
        </div>
        {errors.interests && (
          <p className="text-red-500 text-sm mt-2">
            {errors.interests.message}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            href="/"
            variant="ghost"
            className="rounded-full hover:bg-slate-800"
          >
            Skip
          </Button>
          <div className="flex items-center gap-4">
            <Button href="/profile/profile-information" variant="darkGray">
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
