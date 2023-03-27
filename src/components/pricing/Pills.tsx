import React from "react";

type PillsType = {
  pillType: string;
  sale?: string;
};

const Pills = ({ pillType, sale }: PillsType) => {
  let pillBg = "bg-slate-900";
  let saveBg = "";
  let saveText = "";
  if (pillType === "QUARTERLY") {
    pillBg = "bg-orange-500";
    saveBg = "bg-orange-200";
    saveText = "text-orange-700";
  }
  if (pillType === "ANNUALLY") {
    saveBg = "bg-emerald-200";
    saveText = "text-emerald-700";
  }

  return (
    <div className={` py-2 px-6 ${pillBg}  rounded-full lg:text-base text-xs flex flex-wrap justify-center items-center`}>
      <span>{pillType}</span>
      {sale && (
        <span
          className={`ml-3 ${saveBg} ${saveText}  py-1 px-2 rounded-lg text-xs font-bold`}
        >
          save {sale}
        </span>
      )}
    </div>
  );
};

export default Pills;
