"use server"

import { get } from "@/utils/api";

export async function getData(slug: string) {
  const data = await get(`/${slug}`);

  return data;
}
