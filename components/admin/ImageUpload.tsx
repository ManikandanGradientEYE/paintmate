"use client";

import { useRef, useState } from "react";

/** Shrinks an image so its longest side is at most `maxSide`, as WebP (which keeps
 * transparency). Falls back to the original file if the browser can't re-encode. */
async function resizeImage(file: File, maxSide: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.85)
  );
  return blob && blob.size < file.size ? blob : file;
}

/** "Upload image" button: resizes the picked file, uploads it, and hands back its URL. */
export default function ImageUpload({
  onUploaded,
  maxSide = 1600,
  label = "Upload image",
  className = "",
}: {
  onUploaded: (url: string) => void;
  maxSide?: number;
  label?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const image = await resizeImage(file, maxSide);
      const form = new FormData();
      const name =
        image.type === "image/webp" ? file.name.replace(/\.[^.]*$/, "") + ".webp" : file.name;
      form.append("file", image, name);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setError(body?.error ?? `Upload failed (${response.status})`);
      } else {
        onUploaded(body.url);
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
      >
        {uploading ? "Uploading…" : label}
      </button>
      {error && <p className="mt-1 text-xs font-semibold text-[#C2410C]">{error}</p>}
    </div>
  );
}
