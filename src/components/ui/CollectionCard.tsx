"use client";
import Link from "next/link";
import React, { useState } from "react";
import Icons from "../icons/Icons";

export const CollectionCardMobile = ({ name, description }) => {
  const [clicked, setClicked] = useState(false);
  const handleClicked = () => {
    setClicked(!clicked);
  };
  return (
    <div className=" bg-slate-800 p-4 border-solid border border-slate-700 rounded-3xl">
      <div className=" grid grid-cols-3 gap-3">
        <div className=" overflow-hidden rounded-lg">
          <img
            src="/images/assets/collection-screen2.svg"
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
        <div className=" overflow-hidden rounded-lg">
          <img
            src="/images/assets/collection-screen1.svg"
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
        <CollectionApps />
      </div>
      <div className=" mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">Modified:{description}</p>
        </div>
        <div className=" bg-slate-300 text-slate-800 rounded-md relative w-fit">
          <button className="px-2 py-3" onClick={handleClicked}>
            <Icons.MoreHorizontal></Icons.MoreHorizontal>
          </button>
          <ShowCardLinksUI clicked={clicked} />
        </div>
      </div>
    </div>
  );
};
export const CollectionCardWeb = ({ name, description }) => {
  const [clicked, setClicked] = useState(false);
  const handleClicked = () => {
    setClicked(!clicked);
  };
  return (
    <div className=" bg-slate-800 p-4 border-solid border border-slate-700 rounded-3xl">
      <div className=" grid grid-cols-3 gap-3">
        <div className=" col-span-2 flex flex-col justify-between gap-2">
          <div className=" flex-1 rounded-lg overflow-hidden">
            <img
              src="/images/assets/collection-web1.svg"
              alt=""
              className=" object-cover w-full h-full"
            />
          </div>
          <div className=" flex-1 rounded-lg overflow-hidden">
            <img
              src="/images/assets/collection-web2.svg"
              alt=""
              className=" object-cover w-full h-full"
            />
          </div>
        </div>
        <CollectionApps />
      </div>
      <div className=" mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">Modified:{description}</p>
        </div>
        <div className=" bg-slate-300 text-slate-800 rounded-md relative w-fit">
          <button className="px-2 py-3" onClick={handleClicked}>
            <Icons.MoreHorizontal></Icons.MoreHorizontal>
          </button>
          <ShowCardLinksUI clicked={clicked} />
        </div>
      </div>
    </div>
  );
};
const ShowCardLinksUI = ({ clicked }) => {
  if (clicked) {
    return (
      <div className="px-4 py-5 bg-slate-900 rounded-2xl absolute -top-60 -left-52 flex flex-col w-60">
        <Link
          href="/collection/1"
          className=" flex text-white items-center gap-3 py-2 hover:bg-slate-800 rounded-lg pl-2"
        >
          <Icons.Thumbnail className=" w-[17.5px] h-[17.5px]"></Icons.Thumbnail>
          <span className=" text-slate-100 font-medium">rename</span>
        </Link>
        <Link
          href="/collection/1"
          className=" flex text-white items-center gap-3 py-2 hover:bg-slate-800 rounded-lg pl-2"
        >
          <Icons.Thumbnail className=" w-[17.5px] h-[17.5px]"></Icons.Thumbnail>
          <span className=" text-slate-100 font-medium">
            Publish Collection
          </span>
        </Link>
        <Link
          href="/collection/1"
          className=" flex text-white items-center gap-3 py-2 hover:bg-slate-800 rounded-lg pl-2"
        >
          <Icons.Thumbnail className=" w-[17.5px] h-[17.5px]"></Icons.Thumbnail>
          <span className=" text-slate-100 font-medium">Copy Link</span>
        </Link>
        <Link
          href="/collection/1"
          className=" flex text-red-500 items-center gap-3 py-2 hover:bg-slate-800 rounded-lg pl-2"
        >
          <Icons.Thumbnail className=" w-[17.5px] h-[17.5px]"></Icons.Thumbnail>
          <span className=" font-medium">Delete Collection</span>
        </Link>
      </div>
    );
  }
};
const CollectionApps = () => {
  return (
    <div className=" flex flex-col gap-3 items-center justify-between">
      <div className=" flex-1">
        <img
          src="/images/assets/collection-app1.svg"
          alt=""
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" flex-1">
        <img
          src="/images/assets/collection-app2.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex-1">
        <img
          src="/images/assets/collection-app3.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
