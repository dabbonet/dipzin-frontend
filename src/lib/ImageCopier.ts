'use client'
import { toast } from "react-hot-toast";

export async function copyImagesToClipboard([image]) {
  const imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL + image;
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
    toast.success('Image Copied to Clipboard.')
  } catch (error) {
    toast.error('An error occurred while copying the image to the clipboard:');
  }
}

