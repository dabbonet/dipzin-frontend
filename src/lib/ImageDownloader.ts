'use client'
import JSZip from 'jszip';
import toast from 'react-hot-toast';

export async function ImageDownloader(zipName: string, imageNames: string[]) {
    const zip = new JSZip();
    const downloadImages = imageNames.slice(0, 5);
    try {
        var rand = '?' + Math.random();
        toast.loading('Images getting ready...')
        // Make HTTP requests to download the images
        const imagePromises = downloadImages.map(async (imageName, index) => {
            const url = `https://dipzinapplications.s3.us-west-1.amazonaws.com/${imageName}${rand}`;
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const ext = imageName.slice(imageName.lastIndexOf('.'));
            const name = `${zipName} ${index + 1}${ext}`;
            return { name: name, buffer };
        });
        // Wait for all requests to complete
        const images = await Promise.all(imagePromises);

        // Add the downloaded images to the zip file
        images?.forEach(({ name, buffer }) => {
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

    } catch (error) {
        // Handle error
        toast.dismiss()
        toast.error('Error Downloading Screens');
    }

}


export async function downloadImage(fileName: string, imageName: string) {
    try {
        var rand = '?' + Math.random();
        const url = `https://dipzinapplications.s3.us-west-1.amazonaws.com/${imageName}${rand}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.png`;
        link.click();
        toast.success('Image Downloaded Successfully');
    } catch (error) {
        // Handle error
        console.log(error)
        toast.error('Error Downloading Image');
    }
}