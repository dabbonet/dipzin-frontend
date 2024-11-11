import { put } from "@/utils/api";
import { uploadFileToStrapi } from "@/utils/uploadFileToStrapi";
import QueryString from "qs";

export const updateUser = async (user: any, token: string, id: string) => {
  try {
    // Handle avatar upload first if it exists
    let userAvatar: any = null;
    if (user.avatar && user.avatar instanceof File) {
      const uploadResult = await uploadFileToStrapi(
        user.avatar,
        "plugin::users-permissions.user",
        id,
        "avatar",
        token,
      );
      const [uploadedAvatar] = uploadResult; // Use array destructuring
      userAvatar = uploadedAvatar;
    }

    const payload = {
      ...(user as object),
      ...(userAvatar && typeof userAvatar === "object"
        ? { avatar: userAvatar?.id }
        : {}),
    };

    // Update user data
    const updatedUserRes = await put(
      `/users/${id}?${QueryString.stringify({ populate: "*" })}`,
      payload,
      token,
    );

    if (updatedUserRes.error) {
      throw new Error(updatedUserRes.error.message);
    }

    return { ...updatedUserRes, ...(userAvatar && { avatar: userAvatar }) }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
