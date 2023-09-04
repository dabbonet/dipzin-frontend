'use client'
import React, { useState } from "react";
import Featuers from "./Featuers";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useDialog } from "@/context/useDialog";
type card = {
  subscribeName: string;
  price?: number;
  features: string[];
  price_per?: string;
  pricing?: Boolean
  currentPlan?: boolean;
  id?: string
};

const Card = ({
  subscribeName,
  price,
  features,
  price_per,
  currentPlan,
  id,
}: card) => {
  const { showDialog, DIALOG_ENUM } = useDialog();

  const [loading, setLoading] = useState(false)
  let priceUi
  let dollarUI
  if (typeof price !== `number`) {
    priceUi = (
      <span className=" text-5xl">
        Coming <br /> Soon
      </span>
    );
  } else {
    dollarUI = (
      <span className=" text-slate-300 font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl ml-2">
        $
      </span>
    );
  }

  return (
    <div className={` pl-8 pt-6 pr-10 pb-4 bg-slate-700  rounded-3xl mt-14 flex flex-col h-fit bg-opacity-50 w-[95%] mx-auto`}>
      <h2 className="font-[500] text-3xl">{subscribeName}</h2>
      <span className=" text-slate-300 font-medium">Great for freelancers</span>
      <div className="  mt-4 flex flex-col relative w-fit">

        <div className=" relative w-fit">

          <h3 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold inline">
            {price}
            {priceUi}
            {dollarUI}
          </h3>
        </div>
        {/* for sale */}
        <div className=" mt-3 flex items-center lg:gap-2 md:gap-4 sm:gap-2 gap-1 w-fit">
          <span className="font-medium text-lg text-slate-300">
            {price_per}
          </span>

        </div>
      </div>
      <div className=" mt-3 mb-2">
        {features.map((el) => (
          <Featuers key={el} feature={el} />
        ))}
      </div>
      {price ? <button className="mt-auto bg-slate-900 rounded-3xl py-2 w-full mt-7" onClick={() => {
        setLoading(true)
        goToPayment(id, showDialog, DIALOG_ENUM)
      }}>
        {loading ? <div className="loading-spinner mx-auto"></div> : "Get Started"}
      </button> : ""}
      {currentPlan && <p className=" text-slate-400 mx-auto my-2.5 text-md font-medium">Current Plan</p>}
    </div>
  );
};

export default Card;


export const goToPayment = async (id, showDialog, DIALOG_ENUM) => {
  const req = await fetch('/api/stripe/create-checkout', {
    method: 'POST',
    body: JSON.stringify({
      token: getToken(),
      id: id
    })
  });
  const url = await req.json();
  if (!url.message) {
    window.location.href = url;
  } else {
    // TODO: Open Access Dialog.
    showDialog(DIALOG_ENUM.ACCESS, 'Login to use this features'); // Use the appropriate dialog enum value
  }
}


