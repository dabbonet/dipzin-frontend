'use client'
import { toast } from "react-hot-toast";

// export async function copyImagesToClipboard(imageUrls: string[]) {
//     const images: HTMLImageElement[] = [];

//     // Load all images and push them to the `images` array
//     await Promise.all(imageUrls.map(url => new Promise((resolve) => {
//         var rand = '?' + Math.random();
//         const img = new Image();
//         img.crossOrigin = 'anonymous';
//         img.src = url + rand;
//         img.addEventListener('load', () => {
//             images.push(img);
//             resolve(null);
//         });
//         img.addEventListener('error', () => {
//             resolve(null);
//         });
//     })));
//     toast.success('Image Copied to Clipboard.')

//     // Create a canvas element to draw the images onto
//     const canvas = document.createElement('canvas');
//     canvas.width = images[0].naturalWidth;
//     canvas.height = images[0].naturalHeight;

//     // Draw the images onto the canvas
//     const ctx = canvas.getContext('2d');
//     for (const img of images) {
//         ctx.drawImage(img, 0, 0);
//     }

//     // Create a new canvas element to copy the image data
//     const copyCanvas = document.createElement('canvas');
//     copyCanvas.width = canvas.width;
//     copyCanvas.height = canvas.height;

//     // Draw the original canvas onto the new canvas
//     const copyCtx = copyCanvas.getContext('2d');
//     copyCtx.drawImage(canvas, 0, 0);

//     // Copy the canvas to the clipboard
//     copyCanvas.toBlob((blob) => {
//         navigator.clipboard.write([
//             new ClipboardItem({ 'image/png': blob }),
//         ]);
//     });
// }
export async function copyImagesToClipboard([imageUrl]) {
    console.log(imageUrl);
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
  
