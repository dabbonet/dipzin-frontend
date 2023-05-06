"use client";
import CollectionCard from "@/components/ui/CollectionCard";
import { FC, useEffect, useState } from "react";

const Collections: FC = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getCollection() {
      try {
        const response = await fetch("api/collections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCollection();
  }, []);

  return (
    <div className=" mt-4">
      <div className=" grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
        {data ? (
          data.map((collection) => {
            return (
              <CollectionCard
                key={collection.id}
                name={collection.name}
                description={collection.description}
              />
            );
          })
        ) : (
          <div className=" bg-slate-800 p-4 border border-slate-700 border-solid rounded-3xl">
            new collection card
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
