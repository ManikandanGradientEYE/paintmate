"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { CatalogProduct } from "@/types";

type Draft = {
  categoryLabel: string;
  name: string;
  description: string;
  swatch: string;
  cta: "add" | "ask";
};

function toDraft(item: CatalogProduct): Draft {
  return {
    categoryLabel: item.categoryLabel,
    name: item.name,
    description: item.description,
    swatch: item.swatch,
    cta: item.cta,
  };
}

const EMPTY_DRAFT: Draft = {
  categoryLabel: "",
  name: "",
  description: "",
  swatch: "#1F3D24",
  cta: "add",
};

function CatalogForm({
  draft,
  onChange,
}: {
  draft: Draft;
  onChange: (patch: Partial<Draft>) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <input
        value={draft.categoryLabel}
        onChange={(e) => onChange({ categoryLabel: e.target.value })}
        placeholder="Category label (e.g. Interior · Premium)"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      />
      <input
        value={draft.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Product name"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      />
      <input
        value={draft.description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="Description"
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest sm:col-span-2"
      />
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={draft.swatch}
          onChange={(e) => onChange({ swatch: e.target.value })}
          className="h-9 w-9 shrink-0 cursor-pointer rounded border border-line p-0.5"
        />
        <input
          value={draft.swatch}
          onChange={(e) => onChange({ swatch: e.target.value })}
          className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
        />
      </div>
      <select
        value={draft.cta}
        onChange={(e) => onChange({ cta: e.target.value as "add" | "ask" })}
        className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
      >
        <option value="add">Add to quote</option>
        <option value="ask">Ask on WhatsApp</option>
      </select>
    </div>
  );
}

export default function CatalogEditor({ initialItems }: { initialItems: CatalogProduct[] }) {
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
    const result = await adminFetch<CatalogProduct>(`/api/admin/catalog/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.map((i) => (i.id === id ? result.data : i)));
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    const result = await adminFetch(`/api/admin/catalog/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<CatalogProduct>("/api/admin/catalog", {
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
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const draft = drafts[item.id] ?? toDraft(item);
          return (
            <div key={item.id} className="rounded-xl border border-line bg-white p-4">
              <CatalogForm draft={draft} onChange={(patch) => updateDraft(item.id, patch)} />
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
          Add a product
        </p>
        <CatalogForm draft={newDraft} onChange={(patch) => setNewDraft({ ...newDraft, ...patch })} />
        <button
          type="button"
          onClick={addItem}
          disabled={busyId === "new" || !newDraft.name}
          className="mt-3 rounded-lg bg-tan px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
        >
          + Add product
        </button>
      </div>
    </div>
  );
}
