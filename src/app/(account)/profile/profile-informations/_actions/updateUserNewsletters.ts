"use server";

export const updateUserNewsletters = async (
  token: string | undefined,
  newsletterIds: number[]
) => {
  if (!token) throw new Error("No token provided");

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
