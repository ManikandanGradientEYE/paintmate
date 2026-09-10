"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { SOCIAL_PLATFORMS, SocialLink } from "@/types";

type Draft = { platform: string; url: string; sortOrder: number };

function toDraft(item: SocialLink): Draft {
  return { platform: item.platform, url: item.url, sortOrder: item.sortOrder };
}

const EMPTY_DRAFT: Draft = { platform: "instagram", url: "", sortOrder: 0 };

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
};

export default function SocialLinksEditor({
  initialItems,
}: {
  initialItems: SocialLink[];
}) {
  const [items, setItems] = useState(initialItems);
  const [drafts, setDrafts] = useState<Record<string, Draft>>(
    Object.fromEntries(initialItems.map((i) => [i.id, toDraft(i)]))
  );
  const [newDraft, setNewDraft] = useState<Draft>(EMPTY_DRAFT);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateDraft(id: string, patch: Partial<Draft>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  }

  async function saveItem(id: string) {
    setBusyId(id);
    setError(null);
    const result = await adminFetch<SocialLink>(`/api/admin/socials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? result.data : i))
        .sort((a, b) => a.sortOrder - b.sortOrder)
    );
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    setError(null);
    const result = await adminFetch(`/api/admin/socials/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<SocialLink>("/api/admin/socials", {
      method: "POST",
      body: JSON.stringify(newDraft),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => [...prev, result.data].sort((a, b) => a.sortOrder - b.sortOrder));
    setDrafts((prev) => ({ ...prev, [result.data.id]: toDraft(result.data) }));
    setNewDraft(EMPTY_DRAFT);
  }

  const inputClass =
    "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest";
  const rowClass =
    "grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr_90px_auto] sm:items-center";

  return (
    <div className="mt-6">
      {error && <p className="mb-3 text-sm font-semibold text-brand-pink">{error}</p>}

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const draft = drafts[item.id] ?? toDraft(item);
          return (
            <div
              key={item.id}
              className={`${rowClass} rounded-xl border border-line bg-white p-3`}
            >
              <select
                value={draft.platform}
                onChange={(e) => updateDraft(item.id, { platform: e.target.value })}
                className={inputClass}
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_LABELS[p] ?? p}
                  </option>
                ))}
              </select>
              <input
                value={draft.url}
                onChange={(e) => updateDraft(item.id, { url: e.target.value })}
                placeholder="https://instagram.com/paintmate"
                className={inputClass}
              />
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(e) =>
                  updateDraft(item.id, { sortOrder: Number(e.target.value) })
                }
                title="Order in the footer"
                className={inputClass}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => saveItem(item.id)}
                  disabled={busyId === item.id}
                  className="flex-1 rounded-lg bg-forest px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  disabled={busyId === item.id}
                  className="rounded-lg bg-rose px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${rowClass} mt-5 rounded-xl border border-dashed border-line p-3`}>
        <select
          value={newDraft.platform}
          onChange={(e) => setNewDraft({ ...newDraft, platform: e.target.value })}
          className={inputClass}
        >
          {SOCIAL_PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABELS[p] ?? p}
            </option>
          ))}
        </select>
        <input
          value={newDraft.url}
          onChange={(e) => setNewDraft({ ...newDraft, url: e.target.value })}
          placeholder="https://instagram.com/paintmate"
          className={inputClass}
        />
        <input
          type="number"
          value={newDraft.sortOrder}
          onChange={(e) => setNewDraft({ ...newDraft, sortOrder: Number(e.target.value) })}
          title="Order in the footer"
          className={inputClass}
        />
        <button
          type="button"
          onClick={addItem}
          disabled={busyId === "new" || !newDraft.url.trim()}
          className="rounded-lg bg-tan px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
        >
          + Add link
        </button>
      </div>
    </div>
  );
}
