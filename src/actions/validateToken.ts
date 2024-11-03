'use server'

import { get } from "@/utils/api";

// Server action to fetch data from backend
export async function validateToken(token: any) {
  const response = await get('/users/me', token);
  return !response.error || response.error.status !== 401;
}
