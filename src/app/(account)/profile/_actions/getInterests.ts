"use server";

import { auth } from "@/auth";
import { get } from "@/utils/api";
import queryString from "qs";

export const getInterests = async () => {
  const session = await auth();

  const token = session?.user?.token;

  const query = queryString.stringify({
    fields: ["name"],
  });
  const interestsReq = await get(`/interests?${query}`, token);
  if (!interestsReq) {
    throw new Error("Failed to fetch interests");
  }

  return interestsReq.data.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
  }));
};
