import React from "react";
import Featuers from "./Featuers";

type card = {
  subscribeName: string;
  price?: number;
  sale?: boolean;
  overSale?: number;
  features: string[];
  price_per?: string;
};

const Card = ({
  subscribeName,
  price,
  sale = false,
  features,
  price_per,
  overSale,
}: card) => {
  return (
    <div className=" pl-8 pt-6 pr-14 pb-8 bg-slate-800 rounded-3xl mt-14 flex flex-col">
      <h2 className="font-[500] text-3xl">{subscribeName}</h2>
      <span className=" text-slate-300 font-medium">Great for freelancers</span>
      <div className="  mt-5 flex flex-col relative">
        {sale && (
          <div className=" absolute lg:right-12 lg:top-3 md:right-2 sm:right-0 -right-4">
            <p className=" -rotate-12 text-orange-600 font-bold text-lg">
              Beta Pricing
            </p>
            <img src="/images/assets/Frame.svg" alt="" />
          </div>
        )}
        <div className=" relative w-fit">
          {sale && (
            <img
              src="images/assets/Rectangle.svg"
              className=" max-w-full absolute top-[50%] translate-y-[-50%]"
            />
          )}
          <h3 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold inline">
            {typeof price === `number` ? (
              `${price}`
            ) : (
              <span>
                Coming <br /> Soon
              </span>
            )}
            {typeof price === `number` && (
              <span className=" text-slate-300 font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl ml-2">
                $
              </span>
            )}
          </h3>
        </div>
        {/* for sale */}
        <div className=" mt-3 flex items-center lg:gap-12 md:gap-6 sm:gap-3 gap-2 w-fit">
          <span className="font-medium text-lg text-slate-300">
            {price_per}
          </span>
          {sale && (
            <span className=" text-orange-600 font-bold text-3xl">
              {overSale}
            </span>
          )}
        </div>
      </div>
      <div className=" mt-5 mb-7">
        {features.map((el) => (
          <Featuers key={el} feature={el} />
        ))}
      </div>
      <button className="mt-auto bg-slate-900 rounded-3xl py-2 lg:px-32 px-20 md:px-24 text-lg font-medium ">
        Get Started
      </button>
    </div>
  );
};

export default Card;
