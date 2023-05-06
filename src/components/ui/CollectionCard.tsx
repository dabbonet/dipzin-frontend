import React from "react";

const CollectionCard = ({ name, description }) => {
  return (
    <div className=" bg-slate-800 p-4 border-solid border border-slate-700">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CollectionCard;
