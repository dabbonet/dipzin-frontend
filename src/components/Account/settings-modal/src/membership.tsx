"use client";

import { Button } from "@/components/Shared/button";
import type { ButtonProps } from "@/components/Shared/button/src/button";
import { Pill } from "@/components/Shared/pill";
import { Switcher } from "@/components/Shared/switcher";
import { Card } from "@/components/UI/card";
import { Icon } from "@/components/UI/icon";
import React, { useState } from "react";

const features = {
  free: [
    "Download & Copy PNGs",
    "3 Collections",
    "Limited Search & Filters",
    "Limited Screens & Flows",
  ],
  premium: [
    "Download in bulk",
    "Select and Copy",
    "Unlimited Collections",
    "Unlimited Search & Filters",
  ],
};

const pricingData = {
  free: {
    monthly: { price: 0, period: "Monthly" },
    quarterly: { price: 0, period: "Quarterly" },
    annually: { price: 0, period: "Annually" },
  },
  personal: {
    monthly: { price: 10, period: "Per Month" },
    quarterly: { price: 25, period: "Per Quarter" },
    annually: { price: 90, period: "Per Year" },
  },
};

interface MembershipCardProps {
  planName: string;
  description: string;
  price: number;
  period: string;
  featuresList: string[];
  buttonLabel: string;
  buttonVariant?: ButtonProps["variant"];
  pillText?: string;
  isCurrentPlan?: boolean;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  planName,
  description,
  price,
  period,
  featuresList,
  buttonLabel,
  buttonVariant,
  pillText,
  isCurrentPlan,
}) => (
  <Card className="w-full h-fit p-2 sm:p-4 border border-slate-700">
    <div className="hidden sm:flex flex-row items-center justify-between">
      <div className="size-fit flex flex-col gap-4 mr-12">
        <div>
          <h1 className="text-2xl font-medium">{planName}</h1>
          <p className="text-slate-300 text-lg font-medium">{description}</p>
        </div>
        <div>
          <h1 className="text-[40px] leading-8 font-semibold">
            {price}
            <span className="text-2xl font-medium text-slate-300">$</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium">{period}</p>
        </div>
      </div>
      <div className="size-fit flex flex-col gap-10 mr-6">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold">{isCurrentPlan ? "Current Plan" : "Try It Now"}</p>
          {pillText && <Pill className="bg-aqua-800 text-white">{pillText}</Pill>}
        </div>
        <ul className="list-none p-0 m-0 grid grid-cols-2 gap-4">
          {featuresList.map(feature => (
            <li key={feature} className="flex items-center space-x-1">
              <Icon.Check className="size-5 aspect-square shrink-0 text-aqua-100" />
              <span className="text-lg font-medium   leading-6">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button className="mb-auto" size="lg" variant={buttonVariant}>
        {buttonLabel}
      </Button>
    </div>
    <div className="size-full flex sm:hidden flex-col gap-3 items-center justify-center ">
      <div className="w-full h-fit flex items-center justify-between gap-2">
        <div>
          <h1 className="text-slate-300 text-xl leading-tight font-semibold">{planName}</h1>
          <p className="text-white/60 text-sm font-medium">{description}</p>
        </div>
        {pillText && <Pill className="bg-slate-800 text-white">{pillText}</Pill>}
      </div>
      <ul className="w-full h-fit list-none p-0 m-0 grid grid-cols-2 items-center justify-between gap-2">
        {featuresList.map(feature => (
          <li key={feature} className="flex items-center space-x-1">
            <Icon.Check className="size-5 aspect-square shrink-0 text-aqua-500" />
            <span className="text-[10px] whitespace-nowrap font-semibold leading-6">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="w-full h-fit flex items-center justify-between gap-2">
        <div className="w-full h-fit flex flex-1 items-center justify-center gap-[2px]">
          <h1 className="text-xl leading-8 font-semibold">
            {price}
            <span className="text-sm font-medium">$</span>
          </h1>
          <p className="text-slate-300 text-xs mt-1 leading-normal font-medium">{`(${period})`}</p>
        </div>
        <Button fullWidth className="mb-auto flex-1" size="sm" variant={buttonVariant}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  </Card>
);

const Membership: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
  };

  return (
    <div className="size-full">
      <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between mb-6">
        <Switcher
          data={[
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Annually", value: "annually" },
          ]}
          onChange={handleTimeFrameChange}
          value={timeFrame}
          state="open"
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-6">
        <MembershipCard
          planName="Free"
          description="Great for freelancers"
          price={pricingData.free[timeFrame].price}
          period={pricingData.free[timeFrame].period}
          featuresList={features.free}
          buttonLabel="Cancel Plan"
          buttonVariant="darkGray"
          isCurrentPlan
        />
        <MembershipCard
          planName="Personal"
          description="Great for freelancers"
          price={pricingData.personal[timeFrame].price}
          period={pricingData.personal[timeFrame].period}
          featuresList={features.premium}
          buttonLabel="Try It Now"
          pillText="And Get 15% Off"
        />
      </div>
    </div>
  );
};

export default Membership;
