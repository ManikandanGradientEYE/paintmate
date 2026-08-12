"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { Paint, Surface, Tier } from "@/types";

type Draft = {
  name: string;
  brand: string;
  pricePerLitre: number;
  tier: Tier;
  recommended: boolean;
  isJiwan: boolean;
  approxPrice: boolean;
  surfaces: Surface[];
  whyPick: string;
  sortOrder: number;
};

function toDraft(item: Paint): Draft {
  return {
    name: item.name,
    brand: item.brand,
    pricePerLitre: item.pricePerLitre,
    tier: item.tier,
    recommended: item.recommended,
    isJiwan: item.isJiwan,
    approxPrice: item.approxPrice,
    surfaces: item.surfaces,
    whyPick: item.whyPick ?? "",
    sortOrder: item.sortOrder,
  };
}

const EMPTY_DRAFT: Draft = {
  name: "",
  brand: "",
  pricePerLitre: 200,
  tier: "Value",
  recommended: false,
  isJiwan: false,
  approxPrice: false,
  surfaces: ["interior"],
  whyPick: "",
  sortOrder: 0,
};

function PaintForm({
  draft,
  onChange,
}: {
  draft: Draft;
  onChange: (patch: Partial<Draft>) => void;
}) {
  function toggleSurface(surface: Surface) {
    const has = draft.surfaces.includes(surface);
    const next = has
      ? draft.surfaces.filter((s) => s !== surface)
      : [...draft.surfaces, surface];
    onChange({ surfaces: next.length > 0 ? next : draft.surfaces });
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <input
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Paint name"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      />
      <input
        value={draft.brand}
        onChange={(e) => onChange({ brand: e.target.value })}
        placeholder="Brand"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      />
      <input
        type="number"
        value={draft.pricePerLitre}
        onChange={(e) => onChange({ pricePerLitre: Number(e.target.value) })}
        placeholder="Price per litre"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      />
      <select
        value={draft.tier}
        onChange={(e) => onChange({ tier: e.target.value as Tier })}
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      >
        <option value="Value">Value</option>
        <option value="Premium">Premium</option>
      </select>

      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <input
            type="checkbox"
            checked={draft.recommended}
            onChange={(e) => onChange({ recommended: e.target.checked })}
          />
          Recommended
        </label>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <input
            type="checkbox"
            checked={draft.isJiwan}
            onChange={(e) => onChange({ isJiwan: e.target.checked })}
          />
          Jiwan Paints
        </label>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <input
            type="checkbox"
            checked={draft.approxPrice}
            onChange={(e) => onChange({ approxPrice: e.target.checked })}
          />
          Approx. MRP (~)
        </label>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <input
            type="checkbox"
            checked={draft.surfaces.includes("interior")}
            onChange={() => toggleSurface("interior")}
          />
          Interior
        </label>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
          <input
            type="checkbox"
            checked={draft.surfaces.includes("exterior")}
            onChange={() => toggleSurface("exterior")}
          />
          Exterior
        </label>
      </div>

      <textarea
        value={draft.whyPick}
        onChange={(e) => onChange({ whyPick: e.target.value })}
        placeholder="Why this pick (shown when selected)"
        rows={2}
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest sm:col-span-2"
      />
    </div>
  );
}

export default function PaintsEditor({ initialItems }: { initialItems: Paint[] }) {
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
    const draft = drafts[id]!;
    const result = await adminFetch<Paint>(`/api/admin/paints/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...draft, whyPick: draft.whyPick || null }),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.map((i) => (i.id === id ? result.data : i)));
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    const result = await adminFetch(`/api/admin/paints/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<Paint>("/api/admin/paints", {
      method: "POST",
      body: JSON.stringify({ ...newDraft, whyPick: newDraft.whyPick || null }),
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
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const draft = drafts[item.id] ?? toDraft(item);
          return (
            <div key={item.id} className="rounded-xl border border-line bg-white p-4">
              <PaintForm draft={draft} onChange={(patch) => updateDraft(item.id, patch)} />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => saveItem(item.id)}
                  disabled={busyId === item.id}
                  className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  disabled={busyId === item.id}
                  className="rounded-lg bg-rose px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-line p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">
          Add a paint
        </p>
        <PaintForm draft={newDraft} onChange={(patch) => setNewDraft({ ...newDraft, ...patch })} />
        <button
          type="button"
          onClick={addItem}
          disabled={busyId === "new" || !newDraft.name}
          className="mt-3 rounded-lg bg-tan px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
        >
          + Add paint
        </button>
      </div>
    </div>
  );
}
