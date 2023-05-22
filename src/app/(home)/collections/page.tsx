"use client";

import Icons from "@/components/Icons";
import {CollectionCardMobile, CollectionCardWeb} from "@/components/ui/CollectionCard";
import { FC, useState } from "react";

const Collections: FC = () => {
  const [isPersonalCollection , setIsPersonalCollection] = useState(false)
  const [isWebViewCard , setIsWebViewCard] = useState(false);



  const handlePresonal = () => {
    setIsPersonalCollection(true)
  }
  const handleComunity = () => {
    setIsPersonalCollection(false)
  }
  const presonalCollection = () => {
    if (isPersonalCollection) {
      return <button className=" w-fit">
        <Icons.Image className=" w-4 h-4 text-slate-400"></Icons.Image> 
      </button>
    }
  }
  const showPresonalOrComunityCollectionsButtons = () => { 
    return <>
      <button className={` py-1 px-3 hover:bg-slate-700 ${isPersonalCollection && 'bg-slate-700'} rounded-3xl`} onClick={handlePresonal}>Personal</button>
      <button className={` py-1 px-3 ${!isPersonalCollection && 'bg-slate-700'}  rounded-3xl hover:bg-slate-700`} onClick={handleComunity}>Community</button>
    </>
  }

  const showCards = () => { 
    return isWebViewCard  ? <>
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
  </>
  }


  return (
    <div className=" mt-4">
      <div className=" flex items-center gap-x-36 gap-y-10 justify-end flex-wrap">
        {presonalCollection()}
        <div className=" w-fit bg-slate-800 flex p-2 items-center rounded-3xl mb-4">
          { showPresonalOrComunityCollectionsButtons()}
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1 items-center">
        {showCards()}
      </div>
    </div>
  );
};


export default Collections;

