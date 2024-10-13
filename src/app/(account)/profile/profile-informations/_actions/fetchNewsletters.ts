"use server";

export const fetchNewsletters = async () => {
  const response = await fetch(
    "https://rah.dipzin.com/api/system-news-letters",
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch newsletters");
  }

  const data = await response.json();
  return data;
};
