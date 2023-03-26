import React from "react";

type PlansType = {
  type: string;
  cost: string | number;
};

const Plans = ({ type, cost }: PlansType) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className=" mb-2 font-[600] lg:text-2xl md:text-lg text-sm text-[#F1F5F9]">{type}</span>
      <span className="font-[600] lg:text-3xl md:text-xl text-xs text-[#F1F5F9] mb-5">
        {typeof cost === `number` && "$"}
        {cost}
        {typeof cost === `number` && (
          <span className="text-[#94A3B8] lg:text-base md:text-sm text-xs ml-1">/month</span>
        )}
      </span>
      <button className="text-[#F1F5F9] text-xs md:text-sm lg:text-base bg-[#F97316] sm:px-8 sm:py-3 px-3 py-1 rounded-xl">
        Get Started
      </button>
    </div>
  );
};

export default Plans;
