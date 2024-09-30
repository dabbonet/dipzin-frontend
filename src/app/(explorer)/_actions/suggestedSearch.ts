'use server'

import { get } from "@/utils/api";

export async function suggestSearch() {
  // Simulate an API call
  const results = await get(`/suggested-search`);
  return results;
}
