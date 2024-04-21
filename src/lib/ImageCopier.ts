'use client'
import { toast } from "react-hot-toast";

export async function copyImagesToClipboard([image]) {
  // const imageLink = image + '?d=' + Date.now()
  // const imageUrl = image;
  try {
    const response = await fetch(image, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Origin: window.location.origin,
      },
    });
    const blob = await response.blob();
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
    toast.success('Image Copied to Clipboard.', { position: 'bottom-right' })
  } catch (error) {
    toast.error('An error occurred while copying the image to the clipboard:', { position: 'bottom-right' });
  }
}

