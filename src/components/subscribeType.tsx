import React from "react";

const SubscribeType = ({ type, price }) => {
  return (
    <div className=" bg-slate-800 px-8 py-6 rounded-3xl flex flex-row justify-between items-center">
      <div className="flex flex-wrap items-center gap-x-20">
        <div className="">
          <h4 className=" text-xl font-medium">{type}</h4>
          <p className=" text-sm text-slate-300 font-medium">
            Great for freelancers
          </p>
        </div>
        <div className=" text-3xl font-semibold flex items-center flex-wrap">
          <span className=" relative">
            ${price}
            {price != 0 && (
              <img
                alt=""
                src="images/assets/Rectangle.svg"
                className=" max-w-full absolute top-[50%] translate-y-[-50%]"
              />
            )}
          </span>
          {price != 0 && (
            <span className=" ml-5 text-slate-300 text-base font-medium">
              per month
            </span>
          )}
        </div>
      </div>
      {type === "free" && (
        <img src="/images/assets/profileTypeCheck.svg" alt="" />
      )}
    </div>
  );
};

export default SubscribeType;
