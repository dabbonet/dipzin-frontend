import React from "react";

type PillsType = {
  pillType: string;
  sale?: string;
};

const Pills = ({ pillType, sale }: PillsType) => {
  let pillBg = "bg-slate-900";
  let saveBg = "";
  let saveText = "";
  let saleOn: any;
  if (pillType === "QUARTERLY") {
    pillBg = "bg-orange-500";
    saveBg = "bg-orange-200";
    saveText = "text-orange-700";
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
    <div
      className={` py-2 px-6 ${pillBg}  rounded-full lg:text-base text-xs flex flex-wrap justify-center items-center`}
    >
      <span>{pillType}</span>
      {saleOn}
    </div>
  );
};

export default Pills;
