export async function downloadScreen(screenId: string, screenAppName: string) {
  try {
    const screenUrl = `https://dipzin.blob.core.windows.net/dipzin-storage/assets/71355aa7_1e90_41e3_957c_5a374aba63bf_76f9cec927.png`;
    const response = await fetch(screenUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch screen. Status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const fileName = `${screenAppName}-screen-${screenId}.png`;

    return {
      buffer: Buffer.from(buffer),
      fileName
    }; // Return the buffer and file name for download
  } catch (error) {
    throw new Error('An error occurred while downloading the screen.');
  }
}
