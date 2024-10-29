"use server";

import { auth } from "@/auth";

export const fetchUserDetails = async () => {
  const session = await auth()

  const token = session?.user?.token;

  const response = await fetch("https://rah.dipzin.com/api/account/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // if (!response.ok) {
  //   throw new Error("Failed to fetch user details");
  // }

  const data = await response.json();
  return data;
};
