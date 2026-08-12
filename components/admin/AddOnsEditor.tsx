"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { AddOnDef } from "@/types";

type Draft = { label: string; defaultOn: boolean; priced: boolean };

function toDraft(item: AddOnDef): Draft {
  return { label: item.label, defaultOn: item.defaultOn, priced: item.priced };
}

export default function AddOnsEditor({ initialItems }: { initialItems: AddOnDef[] }) {
  const [items, setItems] = useState(initialItems);
  const [drafts, setDrafts] = useState<Record<string, Draft>>(
    Object.fromEntries(initialItems.map((i) => [i.id, toDraft(i)]))
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateDraft(id: string, patch: Partial<Draft>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  }

  async function saveItem(id: string) {
    setBusyId(id);
    setError(null);
    const result = await adminFetch<AddOnDef>(`/api/admin/add-ons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.map((i) => (i.id === id ? result.data : i)));
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {error && <p className="text-sm font-semibold text-brand-pink">{error}</p>}
      {items.map((item) => {
        const draft = drafts[item.id] ?? toDraft(item);
        return (
          <div
            key={item.id}
            className="grid grid-cols-2 items-center gap-2 rounded-xl border border-line bg-white p-3 sm:grid-cols-5"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">
              {item.slug}
            </p>
            <input
              value={draft.label}
              onChange={(e) => updateDraft(item.id, { label: e.target.value })}
              className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
            />
            <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
              <input
                type="checkbox"
                checked={draft.defaultOn}
                onChange={(e) => updateDraft(item.id, { defaultOn: e.target.checked })}
              />
              On by default
            </label>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
              <input
                type="checkbox"
                checked={draft.priced}
                onChange={(e) => updateDraft(item.id, { priced: e.target.checked })}
              />
              Affects price
            </label>
            <button
              type="button"
              onClick={() => saveItem(item.id)}
              disabled={busyId === item.id}
              className="rounded-lg bg-forest px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
            >
              Save
            </button>
          </div>
        );
      })}
    </div>
  );
}
