"use server";

import { auth } from "@/auth";

export const updateUserProfile = async (
  formData: FormData
) => {
  const session = await auth()

  const token = session?.user?.token;

  const response = await fetch("https://rah.dipzin.com/api/account/update", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user profile");
  }

  const data = await response.json();
  return data;
};
