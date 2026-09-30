import { del } from "@vercel/blob";

/** Blob URLs look like https://<store>.public.blob.vercel-storage.com/uploads/… */
function isBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

/** Removes an uploaded image once nothing points at it. URLs that aren't uploads
 * (e.g. /assets/room.jpg) are left alone, and a failed delete never blocks a save. */
export async function deleteUploadedImage(url: string | null | undefined) {
  if (!url || !isBlobUrl(url)) return;
  await del(url).catch(() => undefined);
}
