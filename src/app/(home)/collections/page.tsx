"use client";
import CollectionCard from "@/components/ui/CollectionCard";
import { FC, useEffect, useState } from "react";

const Collections: FC = () => {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   async function getCollection() {
  //     try {
  //       const response = await fetch("https://rah.dipzin.com/api/collections", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const data = await response.json();
  //       setData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getCollection();
  // }, []);

  return (
    <div className=" mt-4">
      <div className=" w-fit bg-slate-800 flex p-2 items-center rounded-3xl ml-auto mb-4">
        <div className=" py-1 px-3">Personal</div>
        <div className=" py-1 px-3 bg-slate-700 rounded-3xl">Community</div>
      </div>
      <div className=" grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
        <CollectionCard name='colllection name' description='1m' />
        <CollectionCard name='colllection name' description='1m' />
        <CollectionCard name='colllection name' description='1m' />
        <CollectionCard name='colllection name' description='1m' />
        <CollectionCard name='colllection name' description='1m' />
      </div>
    </div>
  );
};


export default Collections;

