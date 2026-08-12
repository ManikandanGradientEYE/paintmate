"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { Shade, ShadeCategory } from "@/types";

type Draft = { code: string; hex: string; category: ShadeCategory; sortOrder: number };

function toDraft(item: Shade): Draft {
  return { code: item.code, hex: item.hex, category: item.category, sortOrder: item.sortOrder };
}

const EMPTY_DRAFT: Draft = { code: "", hex: "#8FA23A", category: "greens", sortOrder: 0 };
const CATEGORIES: ShadeCategory[] = ["greens", "browns", "greys"];

export default function ShadesEditor({ initialItems }: { initialItems: Shade[] }) {
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
    const result = await adminFetch<Shade>(`/api/admin/shades/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.map((i) => (i.id === id ? result.data : i)));
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    const result = await adminFetch(`/api/admin/shades/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<Shade>("/api/admin/shades", {
      method: "POST",
      body: JSON.stringify(newDraft),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => [...prev, result.data]);
    setDrafts((prev) => ({ ...prev, [result.data.id]: toDraft(result.data) }));
    setNewDraft(EMPTY_DRAFT);
  }

  return (
    <div className="mt-6">
      {error && <p className="mb-3 text-sm font-semibold text-brand-pink">{error}</p>}
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const draft = drafts[item.id] ?? toDraft(item);
          return (
            <div
              key={item.id}
              className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-white p-3 sm:grid-cols-6 sm:items-center"
            >
              <input
                value={draft.code}
                onChange={(e) => updateDraft(item.id, { code: e.target.value })}
                placeholder="Code (e.g. JP9580)"
                className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
              />
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.hex}
                  onChange={(e) => updateDraft(item.id, { hex: e.target.value })}
                  className="h-9 w-9 shrink-0 cursor-pointer rounded border border-line p-0.5"
                />
                <input
                  value={draft.hex}
                  onChange={(e) => updateDraft(item.id, { hex: e.target.value })}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
                />
              </div>
              <select
                value={draft.category}
                onChange={(e) =>
                  updateDraft(item.id, { category: e.target.value as ShadeCategory })
                }
                className="rounded-lg border border-line px-3 py-2 text-sm capitalize outline-none focus:border-forest"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="col-span-2 flex gap-2 sm:col-span-3">
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

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-dashed border-line p-3 sm:grid-cols-6 sm:items-center">
        <input
          value={newDraft.code}
          onChange={(e) => setNewDraft({ ...newDraft, code: e.target.value })}
          placeholder="Code"
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
        />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={newDraft.hex}
            onChange={(e) => setNewDraft({ ...newDraft, hex: e.target.value })}
            className="h-9 w-9 shrink-0 cursor-pointer rounded border border-line p-0.5"
          />
          <input
            value={newDraft.hex}
            onChange={(e) => setNewDraft({ ...newDraft, hex: e.target.value })}
            className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
          />
        </div>
        <select
          value={newDraft.category}
          onChange={(e) =>
            setNewDraft({ ...newDraft, category: e.target.value as ShadeCategory })
          }
          className="rounded-lg border border-line px-3 py-2 text-sm capitalize outline-none focus:border-forest"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addItem}
          disabled={busyId === "new" || !newDraft.code}
          className="col-span-2 rounded-lg bg-tan px-3 py-2 text-xs font-bold text-ink disabled:opacity-60 sm:col-span-3"
        >
          + Add shade
        </button>
      </div>
    </div>
  );
}
