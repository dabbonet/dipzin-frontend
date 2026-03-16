import { NextResponse } from "next/server";
import archiver from "archiver";
import { PassThrough } from "stream";
import { getScreenBlob } from "@/utils/getScreenBlob";

export async function POST(req: Request) {
  const { imageUrls, zipName } = await req.json();

  const stream = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Set up event listeners
  archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      console.warn("Archiver warning:", err.message);
    } else {
      throw err;
    }
  });

  archive.on("error", (err) => {
    throw err;
  });

  // Pipe archive data to the stream
  archive.pipe(stream);

  // Fetch images and add them to the archive
  const blobs = await Promise.all(
    imageUrls.map((imageUrl: string) => getScreenBlob(imageUrl)),
  );
  const buffers = await Promise.all(blobs.map((blob) => blob.arrayBuffer()));

  buffers.forEach((buffer, index) => {
    const fileName = `${zipName}_${index + 1}.png`;
    archive.append(Buffer.from(buffer), {
      name: fileName,
    });
  });

  // Finalize the archive
  await archive.finalize();

  // Collect stream data into a Blob
  const bufferChunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    bufferChunks.push(chunk);
  }
  const finalBuffer = Buffer.concat(bufferChunks);

  return new NextResponse(finalBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zipName}.zip"`,
    },
  });
}
