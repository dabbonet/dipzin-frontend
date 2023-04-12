'use client'
import JSZip from 'jszip';
import toast from 'react-hot-toast';

export async function ImageDownloader(zipName: string, imageNames: string[]) {
    const zip = new JSZip();
    toast.loading('Images getting ready.')

    // Make HTTP requests to download the images
    const imagePromises = imageNames.map(async (imageName, index) => {
        const url = `https://dipzinapplications.s3.us-west-1.amazonaws.com/${imageName}`;
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const ext = imageName.slice(imageName.lastIndexOf('.'));
        const name = `${zipName} ${index + 1}${ext}`;
        return { name: name, buffer };
    });

    // Wait for all requests to complete
    const images = await Promise.all(imagePromises);

    // Add the downloaded images to the zip file
    images.forEach(({ name, buffer }) => {
        zip.file(name, buffer);
    });

    // Generate the zip file and return it as a blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Create a download link and click it to download the zip file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `${zipName}.zip`;
    link.click();
    toast.dismiss()
    toast.success('Images Downloaded Successfuly')

    console.log(`Zip file "${zipName}.zip" created.`);
}