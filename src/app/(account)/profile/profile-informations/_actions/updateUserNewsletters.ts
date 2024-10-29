"use server";

import { auth } from "@/auth";

export const updateUserNewsletters = async (
  newsletterIds: number[]
) => {
  const session = await auth()

  const token = session?.user?.token;

  const response = await fetch(
    "https://rah.dipzin.com/api/user-system-news-letters",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          news_letters: newsletterIds,
          auth: token,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update newsletters");
  }

  const data = await response.json();
  return data;
};
