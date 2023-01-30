import React from "react";
import CollectionCard from "./components/collectionCard";

const Collections = ({ arr }: any) => {
  return (
    <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 lg:gap-5 gap-5 mb-10 grid-cols-1 pb-32">
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </div>
  );
};

export default Collections;
