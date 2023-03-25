import React from "react";

type PlansType = {
  type: string;
  cost: string | number;
};

const Plans = ({ type, cost }: PlansType) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className=" mb-2 font-[600] text-2xl text-[#F1F5F9]">{type}</span>
      <span className="font-[600] text-3xl text-[#F1F5F9] mb-5">
        {typeof cost === `number` && "$"}
        {cost}
        {typeof cost === `number` && (
          <span className="text-[#94A3B8] text-base ml-1">/month</span>
        )}
      </span>
      <button className="text-[#F1F5F9] bg-[#F97316] px-8 py-3 rounded-xl">
        Get Started
      </button>
    </div>
  );
};

export default Plans;
