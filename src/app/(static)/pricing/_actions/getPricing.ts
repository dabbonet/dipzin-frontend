"use server";

import { auth } from "@/auth";
import { get } from "@/utils/api";

export const getPricing = async () => {
  const session = await auth();

  const token = session?.user?.token;

  const pricingReq = await get('/pricing', token);

  if (!pricingReq) {
    throw new Error("Failed to fetch pricing");
  }

  return pricingReq.data;
};
