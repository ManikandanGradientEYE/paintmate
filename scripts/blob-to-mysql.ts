/**
 * Moves admin-uploaded images off Vercel Blob: downloads each one, stores it in the
 * UploadedImage table and points the paint / colour room at /api/uploads/<id>.
 *
 *   npx tsx scripts/blob-to-mysql.ts             copy and switch the links over
 *   npx tsx scripts/blob-to-mysql.ts --dry-run   only check every image downloads
 *
 * Run it only once the site serving /api/uploads is live, or the switched images break
 * until it is. Safe to re-run: rows already off Vercel are skipped. The old → new links
 * are written to backup/ so the switch can be undone while the Blob store still exists.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { uploadUrl } from "../lib/uploads";

const dryRun = process.argv.includes("--dry-run");
const prisma = new PrismaClient();

const isBlobUrl = (url: string | null): url is string =>
  !!url && /\.blob\.vercel-storage\.com\//.test(url);

async function download(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  const contentType = response.headers.get("content-type")?.split(";")[0] || "image/webp";
  return { contentType, data: Buffer.from(await response.arrayBuffer()) };
}

async function main() {
  const rows = [
    ...(await prisma.paint.findMany({ select: { id: true, imageUrl: true } })).map((r) => ({
      table: "paint" as const,
      ...r,
    })),
    ...(await prisma.colourRoom.findMany({ select: { id: true, imageUrl: true } })).map((r) => ({
      table: "colourRoom" as const,
      ...r,
    })),
  ].filter((r) => isBlobUrl(r.imageUrl));

  console.log(`${rows.length} images on Vercel Blob${dryRun ? " (dry run)" : ""}`);
  const moved: { table: string; id: string; from: string; to: string; bytes: number }[] = [];

  for (const row of rows) {
    const from = row.imageUrl!;
    const image = await download(from);
    if (dryRun) {
      console.log(`ok  ${row.table} ${row.id}  ${image.contentType}  ${image.data.length} bytes`);
      continue;
    }
    const to = await prisma.$transaction(async (tx) => {
      const { id } = await tx.uploadedImage.create({ data: image, select: { id: true } });
      const url = uploadUrl(id);
      if (row.table === "paint") await tx.paint.update({ where: { id: row.id }, data: { imageUrl: url } });
      else await tx.colourRoom.update({ where: { id: row.id }, data: { imageUrl: url } });
      return url;
    });
    moved.push({ table: row.table, id: row.id, from, to, bytes: image.data.length });
    console.log(`moved ${row.table} ${row.id} → ${to}`);
  }

  if (moved.length) {
    mkdirSync("backup", { recursive: true });
    const file = `backup/blob-links-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    writeFileSync(file, JSON.stringify(moved, null, 2));
    console.log(`Old → new links written to ${file}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
