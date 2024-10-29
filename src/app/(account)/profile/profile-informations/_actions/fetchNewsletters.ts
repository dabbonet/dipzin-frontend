"use server";

// import { auth } from "@/auth";

export const fetchNewsletters = async () => {
  // const session = await auth();

  // const token = session?.user?.token;

  const response = await fetch(
    "https://rah.dipzin.com/api/system-news-letters",
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch newsletters");
  }

  const data = await response.json();
  return data;
};
