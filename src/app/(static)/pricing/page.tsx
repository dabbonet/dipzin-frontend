import Pricing from "@/components/pricing/pricing";
import React from "react";

export default async function page() {
  const data = await pricingList();
  // console.log(data)
  return <Pricing checkOuts={data} />;
}

const pricingList = async () => {
  const req = await fetch("https://rah.dipzin.com/api/pricing");
  const res = await req.json();
  return await res.url.data;
};
