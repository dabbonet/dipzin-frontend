"use server";

import { get } from "@/utils/api";

import { auth } from "@/auth";

export const fetchNewsletters = async () => {
  const session = await auth();

  const token = session?.user?.token;
  const response = await get("/system-news-letters", token);
  if (response.error) {
    throw new Error("Failed to fetch newsletters");
  }

  return response;
};
