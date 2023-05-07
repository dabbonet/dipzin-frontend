"use client";
import React from "react";

const CollectionCard = ({ name, description }) => {
  return (
    <div className=" bg-slate-800 p-4 border-solid border border-slate-700 rounded-3xl">
      <div className=" grid grid-cols-3 gap-3">
        <img src="/images/assets/collection-screen2.svg" alt="" className="" />
        <img src="/images/assets/collection-screen1.svg" alt="" className="" />
        <div className=" flex flex-col gap-3 items-center">
          <img src="/images/assets/collection-app1.svg" alt="" className="" />
          <img src="/images/assets/collection-app2.svg" alt="" className="" />
          <img src="/images/assets/collection-app3.svg" alt="" className="" />
        </div>
      </div>
      <div className=" mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">Modified:{description}</p>
        </div>
        <div className=" bg-slate-300 text-slate-800 rounded-md px-2 py-3">ooo</div>
      </div>
    </div>
  );
};

export default CollectionCard;
