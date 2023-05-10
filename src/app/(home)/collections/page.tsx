"use client";
import Icons from "@/components/Icons";
import {CollectionCardMobile, CollectionCardWeb} from "@/components/ui/CollectionCard";
import { FC, useEffect, useState } from "react";

const Collections: FC = () => {
  const [personal, setPersonal] = useState(false)
  const [webCollections, setWebCollections] = useState(true);
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
      <div className=" flex items-center gap-x-36 gap-y-10 justify-end flex-wrap">
        {personal &&
          <button className=" w-fit">
            <Icons.Image className=" w-4 h-4 text-slate-400"></Icons.Image>
          </button>}
        <div className=" w-fit bg-slate-800 flex p-2 items-center rounded-3xl mb-4">
          <button className={` py-1 px-3 hover:bg-slate-700 ${personal && 'bg-slate-700'} rounded-3xl`} onClick={()=> setPersonal(true)}>Personal</button>
          <button className={` py-1 px-3 ${!personal && 'bg-slate-700'}  rounded-3xl hover:bg-slate-700`} onClick={()=> setPersonal(false)}>Community</button>
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1 items-center">
        {webCollections ? <>
          <CollectionCardWeb name='colllection name' description='1m' />
        <CollectionCardWeb name='colllection name' description='1m' />
        <CollectionCardWeb name='colllection name' description='1m' />
        <CollectionCardWeb name='colllection name' description='1m' />
        <CollectionCardWeb name='colllection name' description='1m' />
        
        </> : <>
        
        <CollectionCardMobile name='colllection name' description='1m' />
        <CollectionCardMobile name='colllection name' description='1m' />
        <CollectionCardMobile name='colllection name' description='1m' />
        <CollectionCardMobile name='colllection name' description='1m' />
        <CollectionCardMobile name='colllection name' description='1m' />
        
        </>}
        
      </div>
    </div>
  );
};

export default Collections;