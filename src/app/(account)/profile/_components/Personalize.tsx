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
    className="flex items-center justify-start gap-2 sm:gap-4 bg-slate-900 p-2 sm:py-2 sm:px-3 rounded-xl"
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
    <span className="w-6 sm:w-9 flex justify-center items-center bg-slate-800 border border-solid border-aqua-300 rounded-md sm:rounded-xl overflow-hidden p-1 sm:p-1.5 aspect-square shrink-0">
      <Image src={icon} alt={name} width={50} height={50} />
    </span>
    <p className="text-xs leading-tight whitespace-nowrap sm:text-base">
      {name}
    </p>
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
    className={`text-slate-200 text-sm py-2 px-4 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors border ${
      selected ? "border-aqua-300" : "border-transparent"
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
      <div className="grid grid-cols-2 mt-3 justify-between sm:justify-center gap-2 sm:gap-4">
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
        <p className="text-danger-400 text-sm mt-2">
          {errors.positions.message}
        </p>
      )}
      <h3 className="text-slate-300 mb-1 text-base font-normal mt-9">
        Interests
      </h3>
      <p className="text-slate-500 mb-4">
        Help us develop and prioritize features, and customize your
        experience.
      </p>
      <div className="size-full flex flex-wrap overflow-y-scroll gap-3">
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
              className="w-36 h-9 rounded-full bg-slate-800 "
            />
          ))}
      </div>
      {errors.interests && (
      <p className="text-danger-400 text-sm mt-2">
        {errors.interests.message}
      </p>
      )}
      <div className="w-full h-fit flex justify-end gap-x-4 mt-4">
        <Button className="flex-1" href="/" variant="ghost" fullWidth size="lg">
          Skip
        </Button>
        <Button className="flex-1" type="submit" fullWidth size="lg">
          Next
        </Button>
      </div>
    </form>
  );
}
