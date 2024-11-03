const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE;
if (!STORAGE_BASE_URL) {
  throw new Error("NEXT_PUBLIC_STORAGE environment variable is not set");
}
const storage = (fileName: string, size?: "medium" | "large" | null) => `${STORAGE_BASE_URL}/${size ? `${size}_` : ""}${fileName}`;

export { storage };
