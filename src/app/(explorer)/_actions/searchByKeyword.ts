'use server'

import { auth } from "@/auth";
import { get } from "@/utils/api";

export async function searchByKeyword(keyword: string) {
  const session = await auth()
  const token = session?.user?.token;
  // Simulate an API call
  const results = await get(`/search/${keyword}`, token);
  return results;
}
