"use server";

export const fetchUserDetails = async (token: string | undefined) => {
  if (!token) throw new Error("No token provided");

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
