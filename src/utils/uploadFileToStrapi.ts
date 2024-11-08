export const uploadFileToStrapi = async (
  file: File,
  ref: string,
  refId: string,
  field: string,
  token: string,
) => {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("ref", ref);
  formData.append("refId", refId);
  formData.append("field", field);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Upload failed: ${response.statusText}`);
  } catch (error: any) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};
