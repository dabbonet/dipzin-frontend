'use server'

import { auth } from "@/auth";
import { get } from "@/utils/api";

export async function searchByKeyword(keyword: string) {
  console.log('keyword: ', JSON.stringify(keyword, null, 2));
  const session = await auth()
  const token = session?.user?.token;
  // Simulate an API call
  const results = await get(`/search/${keyword}`, token);
  console.log('results: ', JSON.stringify(results, null, 2));
  return results;
}
