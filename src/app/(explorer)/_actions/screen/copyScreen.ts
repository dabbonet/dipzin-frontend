"use server";

import clipboardy from 'clipboardy';

export async function copyImageToClipboard(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);

    console.log(`Failed to fetch image. Status: ${await response.json()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    await clipboardy.write(`data:image/png;base64,${base64String}`);
  } catch (error) {
    throw new Error('An error occurred while copying the image to the clipboard.');
  }
}
