"use server";

import { get } from "@/utils/api";

import { auth } from "@/auth";

export const getNewsletters = async () => {
  const session = await auth();

  const token = session?.user?.token;
  const response = await get("/system-news-letters", token);
  if (response.error) {
    throw new Error("Failed to fetch newsletters");
  }

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
  }));
};
