import { prisma } from "@/lib/prisma";

/** Uploaded images live in the UploadedImage table and are served from here. */
const UPLOAD_PATH = "/api/uploads/";

export function uploadUrl(id: string) {
  return `${UPLOAD_PATH}${id}`;
}

/** Upload URLs look like /api/uploads/<id>; returns the id, or null for anything else. */
function uploadId(url: string) {
  return url.startsWith(UPLOAD_PATH) ? url.slice(UPLOAD_PATH.length) || null : null;
}

/** Removes an uploaded image once nothing points at it. URLs that aren't uploads
 * (e.g. /assets/room.jpg) are left alone, and a failed delete never blocks a save. */
export async function deleteUploadedImage(url: string | null | undefined) {
  const id = url ? uploadId(url) : null;
  if (!id) return;
  await prisma.uploadedImage.deleteMany({ where: { id } }).catch(() => undefined);
}
