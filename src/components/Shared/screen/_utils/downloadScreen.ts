export async function downloadScreen(screenHash: string, screenExt: string, screenAppName: string) {
  try {
    const response = await fetch(`https://dipzin.blob.core.windows.net/dipzin-storage/assets/${screenHash}.${screenExt}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch screen. Status: ${response.status}`);
    }

    // Get the image as a blob
    const blob = await response.blob();
    const fileName = `${screenAppName}-screen-${screenHash}.${screenExt}`;

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create a URL for the blob
    link.download = fileName; // Set the desired file name

    // Programmatically click the link to trigger the download
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the link

    // Release the blob URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('An error occurred while downloading the screen:', error);
  }
}
