// Utility function to fetch the image blob
export async function getScreenBlob(imageUrl: string): Promise<Blob> {
  try {
    const response = await fetch(imageUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }
    return await response.blob();
  } catch (error) {
    throw new Error("An error occurred while fetching the image");
  }
}
