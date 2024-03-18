"use client";

import {
  CollectionCardMobile,
  CollectionCardWeb,
} from "@/components/ui/CollectionCard";
import { FC, useState } from "react";

const Collections: FC = () => {
  const collectionsData = [
    { name: "collection name", description: "1m" },
    { name: "collection name", description: "1m" },
    { name: "collection name", description: "1m" },
    { name: "collection name", description: "1m" },
    { name: "collection name", description: "1m" },
  ];
  const [isPersonalCollection, setIsPersonalCollection] = useState(false);
  const [isWebViewCard] = useState(true);

  const handleSetPersonal = () => {
    setIsPersonalCollection(true);
  };
  const handleSetCommunity = () => {
    setIsPersonalCollection(false);
  };
  const renderCollectionCard = (collection, index) => {
    const CardComponent = isWebViewCard
      ? CollectionCardWeb
      : CollectionCardMobile;
    return (
      <CardComponent
        key={index}
        name={collection.name}
        description={collection.description}
      />
    );
  };

  return (
    <>
      {/* <Banner />
      <HomeNavigator /> */}
      <div className="mt-4 ">
        <div className="flex flex-wrap items-center justify-end gap-x-36 gap-y-10">
          {isPersonalCollection ? (
            <>
              <button className=" w-fit">
                <img src="/images/assets/folder-add.svg" alt="" />
              </button>
              <div className="flex items-center p-2 mb-4 w-fit bg-slate-800 rounded-3xl">
                <button
                  className="px-3 py-1 hover:bg-slate-700 bg-slate-700 rounded-3xl"
                  onClick={handleSetPersonal}
                >
                  Personal
                </button>
                <button
                  className="px-3 py-1 rounded-3xl hover:bg-slate-700"
                  onClick={handleSetCommunity}
                >
                  Community
                </button>
              </div>
            </>
          ) : null}
        </div>
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {/* {isWebViewCard ? (
            <>
              <CollectionCardWeb name="colllection name" description="1m" />
              <CollectionCardWeb name="colllection name" description="1m" />
              <CollectionCardWeb name="colllection name" description="1m" />
              <CollectionCardWeb name="colllection name" description="1m" />
              <CollectionCardWeb name="colllection name" description="1m" />
            </>
          ) : (
            <>
              <CollectionCardMobile name="colllection name" description="1m" />
              <CollectionCardMobile name="colllection name" description="1m" />
              <CollectionCardMobile name="colllection name" description="1m" />
              <CollectionCardMobile name="colllection name" description="1m" />
              <CollectionCardMobile name="colllection name" description="1m" />
            </>
          )} */}
          {collectionsData.map(renderCollectionCard)}
        </div>
      </div>
    </>
  );
};

export default Collections;
