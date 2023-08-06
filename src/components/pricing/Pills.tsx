import React from "react";

type PillsType = {
  pillType?: any;
  sale?: any;
  interval?: any
  setCheckOut?: any
  checkout?: any
};

const Pills = ({ pillType, sale, interval, setCheckOut, checkout }: PillsType) => {
  // console.log(interval, checkout)
  let saveStyle = checkout == interval ? 'bg-slate-900 text-aqua-50' : 'bg-aqua-200 text-aqua-950'
  let bgStyle = checkout == interval ? 'bg-gradient-to-b from-aqua-500 to-aqua-700' : 'bg-slate-900'
  let saleOn: any;
  if (sale) {
    saleOn = (
      <span
        className={`ml-3 ${saveStyle}  py-1 px-2 rounded-lg text-xs font-bold`}
      >
        Save {sale}
      </span>
    );
  }
  return (
    <button
      className={` py-2 px-6 ${bgStyle} rounded-full lg:text-base text-xs flex flex-wrap justify-center items-center `}
      onClick={() => setCheckOut(interval)}
    >
      <span>{pillType}</span>
      {saleOn}
    </button>
  );
};

export default Pills;
