/** Compress an image file to a JPEG data URL suitable for Redis/product storage. */
export async function fileToCompressedDataUrl(
  file: File,
  options?: { maxWidth?: number; maxHeight?: number; quality?: number; maxBytes?: number },
): Promise<string> {
  const maxWidth = options?.maxWidth ?? 1200;
  const maxHeight = options?.maxHeight ?? 1500;
  const quality = options?.quality ?? 0.78;
  const maxBytes = options?.maxBytes ?? 700_000;

  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file (JPG, PNG, or WebP).");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image is too large. Please use a file under 8 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image in this browser.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let q = quality;
  let dataUrl = canvas.toDataURL("image/jpeg", q);

  while (dataUrl.length > maxBytes && q > 0.4) {
    q -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", q);
  }

  if (dataUrl.length > maxBytes) {
    throw new Error("Image is still too large after compression. Try a smaller photo.");
  }

  return dataUrl;
}

export function isDataImage(src: string) {
  return src.startsWith("data:image/");
}
