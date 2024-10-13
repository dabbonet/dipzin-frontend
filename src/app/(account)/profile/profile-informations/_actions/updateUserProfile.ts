"use server";

export const updateUserProfile = async (
  token: string | undefined,
  formData: FormData
) => {
  if (!token) throw new Error("No token provided");

  formData.append("auth", token);

  const response = await fetch("https://rah.dipzin.com/api/account/update", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user profile");
  }

  const data = await response.json();
  return data;
};
