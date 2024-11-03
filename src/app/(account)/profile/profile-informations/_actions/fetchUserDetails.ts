"use server";

import { auth } from "@/auth";
import { get } from "@/utils/api";

export const fetchUserDetails = async () => {
  const session = await auth()
  const token = session?.user?.token;
  const response = await get("/users/me", token);

  if (response.error) {
    throw new Error("Failed to fetch user details");
  }

  return response;
};
