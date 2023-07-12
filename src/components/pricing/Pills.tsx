import React from "react";

type PillsType = {
  pillType: string;
  sale?: string;
  interval: any
  setCheckOut : any
};

const Pills = ({ pillType, sale , interval , setCheckOut}: PillsType) => {
  let pillBg = "bg-slate-900";
  let saveBg = "";
  let saveText = "";
  let saleOn: any;
  if (pillType === "QUARTERLY") {
    pillBg = 'bg-gradient-to-r from-aqua-200 to-aqua-700';
    saveBg = "bg-aqua-200";
    saveText = "text-aqua-700";
  }
  if (pillType === "ANNUALLY") {
    saveBg = "bg-emerald-200";
    saveText = "text-emerald-700";
  }
  if (sale) {
    saleOn = (
      <span
        className={`ml-3 ${saveBg} ${saveText}  py-1 px-2 rounded-lg text-xs font-bold`}
      >
        save {sale}
      </span>
    );
  }
  return (
    <button
      className={` py-2 px-6 ${pillBg} rounded-full lg:text-base text-xs flex flex-wrap justify-center items-center `}
      onClick={()=> setCheckOut(interval)}
    >
      <span>{pillType}</span>
      {saleOn}
    </button>
  );
};

export default Pills;
