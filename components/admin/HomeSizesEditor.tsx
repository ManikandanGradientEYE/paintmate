"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { HomeSize } from "@/types";

type Draft = { label: string; sublabel: string; sqft: number; sortOrder: number };

function toDraft(item: HomeSize): Draft {
  return {
    label: item.label,
    sublabel: item.sublabel,
    sqft: item.sqft,
    sortOrder: item.sortOrder,
  };
}

const EMPTY_DRAFT: Draft = { label: "", sublabel: "", sqft: 1000, sortOrder: 0 };

export default function HomeSizesEditor({ initialItems }: { initialItems: HomeSize[] }) {
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
    const result = await adminFetch<HomeSize>(`/api/admin/home-sizes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.map((i) => (i.id === id ? result.data : i)));
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    const result = await adminFetch(`/api/admin/home-sizes/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<HomeSize>("/api/admin/home-sizes", {
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
              className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-white p-3 sm:grid-cols-5 sm:items-center"
            >
              <input
                value={draft.label}
                onChange={(e) => updateDraft(item.id, { label: e.target.value })}
                placeholder="Label (e.g. 2 BHK)"
                className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
              />
              <input
                value={draft.sublabel}
                onChange={(e) => updateDraft(item.id, { sublabel: e.target.value })}
                placeholder="Sublabel (e.g. approx. 2,900 sq ft)"
                className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest sm:col-span-2"
              />
              <input
                type="number"
                value={draft.sqft}
                onChange={(e) => updateDraft(item.id, { sqft: Number(e.target.value) })}
                placeholder="Sq ft"
                className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
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

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-dashed border-line p-3 sm:grid-cols-5 sm:items-center">
        <input
          value={newDraft.label}
          onChange={(e) => setNewDraft({ ...newDraft, label: e.target.value })}
          placeholder="Label"
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
        />
        <input
          value={newDraft.sublabel}
          onChange={(e) => setNewDraft({ ...newDraft, sublabel: e.target.value })}
          placeholder="Sublabel"
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest sm:col-span-2"
        />
        <input
          type="number"
          value={newDraft.sqft}
          onChange={(e) => setNewDraft({ ...newDraft, sqft: Number(e.target.value) })}
          placeholder="Sq ft"
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={busyId === "new" || !newDraft.label}
          className="rounded-lg bg-tan px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
