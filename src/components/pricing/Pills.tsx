import React from "react";

type pills = {
  type: string;
  cost: string | number;
  features: string[];
  sale?: boolean;
  payment_per?: string;
};

const Pills = ({ type, cost, features, sale, payment_per }: pills) => {
  return (
    <div className="h-auto pl-8 pt-6 pb-8 pr-14 w-[445px] bg-slate-800 rounded-[50px] flex flex-col">
      <span className="font-medium text-3xl mb-3">{type}</span>
      <span className="font-medium text-lg text-slate-300">
        Great for freelancers
      </span>
      {sale ? (
        <div className="flex">
          <div>
            <span className="font-semibold text-7xl relative ">
              {cost}
              <span className="font-semibold text-5xl text-slate-300 ml-2">
                $
              </span>
              <img
                src="/images/assets/Rectangle.svg"
                className=" absolute top-[50%] translate-y-[-50%]"
              />
            </span>
            <div className=" flex flex-row  gap-11 items-center w-fit">
              <span className="font-medium text-lg text-slate-300">
                {payment_per}
              </span>
              <span className=" font-[700] text-[#EA580C] text-3xl">3.99</span>
            </div>
          </div>
          <div>
            <span className=" block text-lg text-[#EA580C] -rotate-15 ml-2">
              Beta Pricing
            </span>
            <img src="images/assets/Frame.svg" className=" ml-5" />
          </div>
        </div>
      ) : (
        <div>
          <span className="font-semibold text-7xl">
            {cost}
            <span className="font-semibold text-5xl text-slate-300 ml-2">
              {typeof cost === "number" && "$"}
            </span>
          </span>
          <span className="font-medium  text-lg text-slate-300 block">
            {typeof cost === "number" && payment_per}
          </span>
        </div>
      )}
      <div className="ml-3 mt-5 mb-7">
        {features?.map((el) => (
          <div key={el} className="flex items-center mb-2">
            <span className="mr-2">
              <img src="/images/assets/check.svg" alt="check" />
            </span>
            <span className="font-medium text-lg ml-1">{el}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-[100%] mt-auto  h-14 bg-[#0B1321] mx-auto rounded-3xl">
        <span>Get Started</span>
      </div>
    </div>
  );
};

export default Pills;
