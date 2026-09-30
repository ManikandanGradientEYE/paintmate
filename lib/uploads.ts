import { del } from "@vercel/blob";

/** Vercel Blob read-write token, kept in code rather than an env variable.
 * Anyone who can read this file can write to and delete from the store. */
export const BLOB_TOKEN = "vercel_blob_rw_Hgv5Am4ywGF9b9bR_iBFZ1FoZbfkVaYcwtpJanIyxBIOeDV";

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
  await del(url, { token: BLOB_TOKEN }).catch(() => undefined);
}
