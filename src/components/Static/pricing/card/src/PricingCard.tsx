import React, { useState } from "react";
import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";

const ListItem = ({ item }: { item: string }) => (
  <div className="flex items-center gap-2 font-medium text-lg">
    <Icon.Check className="size-6" />
    <p>{item}</p>
  </div>
);

type PricingCardProps = {
  planName: string;
  planDescription: string;
  amount?: number;
  featuresList: string[];
  billingPeriod?: string;
  isCurrentPlan?: boolean;
  // planId?: string;
};

const PricingCard = ({
  planName,
  planDescription,
  amount,
  featuresList,
  billingPeriod,
  isCurrentPlan,
}: PricingCardProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-8 size-fit bg-slate-800 rounded-3xl flex flex-col gap-6 text-white mx-auto font-outfit">
      <div className="space-y-3">
        <span>
          <h2 className="font-medium text-[28px]">{planName}</h2>
          <small className="text-slate-300 font-medium text-lg">{planDescription}</small>
        </span>
        <div className="flex flex-col relative w-fit">
          <h3 className="text-7xl font-semibold leading-[96px]">
            {amount}
            <span className="text-slate-300 font-medium text-5xl">$</span>
          </h3>
          <span className="font-medium text-lg text-slate-300">{billingPeriod}</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {featuresList.map((feature) => (
          <ListItem key={feature} item={feature} />
        ))}
      </div>
      {amount && (
        <Button
          className="mt-auto w-full min-w-[350px]"
          size="2xl"
          variant="strocked"
          onClick={() => setLoading(true)}
          loading={loading}
        >
          Get Started
        </Button>

      )}
      {isCurrentPlan && (
        <p className="text-slate-400 mx-auto my-2.5 text-base font-medium">Current Plan</p>
      )}
    </div>
  );
};

export default PricingCard;
