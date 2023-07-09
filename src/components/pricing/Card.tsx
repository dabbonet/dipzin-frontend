import React from "react";
import Featuers from "./Featuers";
type card = {
  subscribeName: string;
  price?: number;
  sale?: boolean;
  overSale?: number;
  features: string[];
  price_per?: string;
  pricing?: Boolean
};

const Card = ({
  subscribeName,
  price,
  features,
  price_per,
  
}: card) => {
  let betaPrice: any;
  let rectAngle: any;
  let overSaleSpan: any;
  let priceUi: any;
  let priceDolarUi: any;

  
  if (typeof price === `number`) {
    priceUi = <span>{price}</span>;
    priceDolarUi = (
      <span className=" text-slate-300 font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl ml-2">
        $
      </span>
    );
  } else {
    priceUi = (
      <span className=" text-5xl">
        Coming <br /> Soon
      </span>
    );
  }

  return (
    <div className={` pl-8 pt-6 pr-10 pb-4 bg-slate-700  rounded-3xl mt-14 flex flex-col h-fit`}>
      <h2 className="font-[500] text-3xl">{subscribeName}</h2>
      <span className=" text-slate-300 font-medium">Great for freelancers</span>
      <div className="  mt-4 flex flex-col relative w-fit">
        {betaPrice}
        <div className=" relative w-fit">
          {rectAngle}
          <h3 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold inline">
            {priceUi}
            {priceDolarUi}
          </h3>
        </div>
        {/* for sale */}
        <div className=" mt-3 flex items-center lg:gap-2 md:gap-4 sm:gap-2 gap-1 w-fit">
          <span className="font-medium text-lg text-slate-300">
            {price_per}
          </span>
          {overSaleSpan}
        </div>
      </div>
      <div className=" mt-3 mb-7">
        {features.map((el) => (
          <Featuers key={el} feature={el} />
        ))}
      </div>
      {price ? <button className="mt-auto bg-slate-900 rounded-3xl py-2 w-full">
        Get Started
      </button> : ""}
    </div>
  );
};

export default Card;


