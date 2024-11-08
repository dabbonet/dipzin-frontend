"use server";

import { get } from "@/utils/api";
import QueryString from "qs";

// Server action to fetch data from backend
export async function validateToken(token: any) {
  const response = await get(
    `/users/me?${QueryString.stringify({ populate: "*" })}`,
    token,
  );
  return !response.error || response.error.status !== 401;
}
