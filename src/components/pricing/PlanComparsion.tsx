import React from "react";
import Image from "next/image";

const FeatureIcon = ({ available }) => {
  if (available === true) {
    return (
      <img src="/images/assets/Frame-check.svg" alt="Yes" className="w-5 h-5" />
    );
  } else if (available === false) {
    return (
      <img src="/images/assets/Frame-False.svg" alt="No" className="w-5 h-5" />
    );
  } else {
    // If the value is not strictly true or false, display the value itself (e.g., 'Limited', 'Soon', 'Unlimited')
    return <span className="text-sm text-gray-300">{available}</span>;
  }
};

const PlanComparsion = () => {
  const plans = [
    {
      name: "Free",
      price: "$0 /month",
      buttonText: "Current Plan",
      features: [
        { name: "All Apps Access", available: true },
        { name: "Latest Version", available: true },
        { name: "Image Copy & Download", available: true },
        { name: "Bulk download", available: "Limited" },
        { name: "Flows", available: "Soon" },
        { name: "Search and Filters", available: "Limited" },
        { name: "Collections", available: "Limited" },
        { name: "Team Members", available: false },
        { name: "Team Collections", available: false },
        { name: "Centralized Billing", available: false },
        { name: "Seat-based Pricing", available: false },
      ],
    },
    {
      name: "Personal",
      price: "$10 month",
      buttonText: "Get Started",
      features: [
        { name: "All Apps Access", available: true },
        { name: "Latest Version", available: true },
        { name: "Image Copy & Download", available: true },
        { name: "Bulk download", available: true },
        { name: "Flows", available: "Unlimited" },
        { name: "Search and Filters", available: "Unlimited" },
        { name: "Collections", available: "Unlimited" },
        { name: "Team Members", available: false },
        { name: "Team Collections", available: false },
        { name: "Centralized Billing", available: false },
        { name: "Seat-based Pricing", available: false },
      ],
    },
    {
      name: "Team",
      price: "Coming Soon...",
      features: [
        { name: "All Apps Access", available: true },
        { name: "Latest Version", available: true },
        { name: "Image Copy & Download", available: true },
        { name: "Bulk download", available: true },
        { name: "Flows", available: "Unlimited" },
        { name: "Search and Filters", available: "Unlimited" },
        { name: "Collections", available: "Unlimited" },
        { name: "Team Members", available: false },
        { name: "Team Collections", available: false },
        { name: "Centralized Billing", available: false },
        { name: "Seat-based Pricing", available: false },
      ],
    },
  ];
  return (
    <div className="w-full h-full bg-black text-white p-12 ">
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-4 gap-4">
          {/* Column for feature names */}
          <div className="w-full h-full flex flex-col">
            <div className="flex flex-col justify-between">
              <div className="flex flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="font-semibold lg:text-3xl md:text-lg sm:text-base text-sm mb-2">
                    Plan Comparison
                  </h1>

                  <p className="text-slate-400 font-medium lg:text-base md:text-start text-xs">
                    Find your best subscription.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-20">
              <h3 className=" text-slate-100 lg:text-2xl md:text-lg sm:text-base text-xs">
                Features
              </h3>
            </div>
            {/* List of Features */}
            {plans[0].features.map((feature, index) => (
              <div key={index} className="py-2 border-b border-gray-600">
                <span className="lg:text-base md:text-sm text-xs">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>

          {/* Columns for each plan */}
          {plans.map((plan, planIndex) => (
            <div key={planIndex} className="flex flex-col justify-between ">
              {/* Plan header */}
              <div className="mb-[51px]">
                <h3 className="text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs">
                  {plan.name}
                </h3>
                <h4 className=" text-slate-100 font-semibold  lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                  {plan.price.split("/")[0]}
                  <span className=" text-slate-400 lg:text-base md:text-sm text-xs">
                    {plan.price.split("/")[1]}
                  </span>
                </h4>

                {plan.buttonText && (
                  <button
                    className={`text-sm lg:text-base lg:py-3 py-1 lg:px-8 md:px-6 sm:px-4 px-2  rounded-xl ${
                      planIndex === 0 ? "bg-slate-800" : "bg-aqua-500"
                    } `}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
              {/* List of Features with icons or texts */}
              {plan.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="py-2 border-b border-gray-600 flex justify-center items-center"
                >
                  <FeatureIcon available={feature.available} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanComparsion;
