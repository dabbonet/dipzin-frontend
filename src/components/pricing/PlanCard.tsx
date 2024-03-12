import React from "react";
import Image from "next/image";

type FeatureProps = {
  feature: string;
  available: boolean;
};

const Feature: React.FC<FeatureProps> = ({ feature, available }) => (
  <div className="flex items-center justify-between py-2 border-t border-slate-700">
    <span className="text-xs lg:text-base md:text-sm">{feature}</span>
    <div className="flex justify-center flex-1">
      {available ? (
        // Replace with your checkmark icon
        <Image
          src="/images/assets/Frame-check.svg"
          alt="Check"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ) : (
        // Replace with your cross icon or other indicator for unavailable
        <Image
          src="/images/assets/Frame-False.svg"
          alt="Cross"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )}
    </div>
  </div>
);

const PlanCard: React.FC = () => {
  // Define your plan features and availability
  const features = [
    { name: "All Apps Access", available: true },
    { name: "Latest Version", available: true },
    // ... add other features
  ];

  return (
    <div className="container mx-auto mt-32 p-4">
      <h2 className="font-semibold text-3xl mb-2 text-white">
        Plan Comparison
      </h2>
      <p className="text-slate-400 font-medium text-xs mb-6">
        Find your best subscription.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Plan cards */}
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <h5 className="text-white text-lg">Free</h5>
          <p className="text-slate-400 text-sm">$0/month</p>
          <button className="mt-4 bg-slate-700 text-sm text-white py-2 px-4 rounded-lg">
            Current Plan
          </button>
        </div>
        {/* Repeat for each plan */}

        {/* Features list */}
        <div className="md:col-span-3">
          <h3 className="text-white text-xl mb-4">Features</h3>
          {features.map((feature) => (
            <Feature
              key={feature.name}
              feature={feature.name}
              available={feature.available}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
