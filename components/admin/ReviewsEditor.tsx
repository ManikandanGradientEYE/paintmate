"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { Review } from "@/types";

type Draft = { body: string; name: string; role: string; sortOrder: number };

function toDraft(item: Review): Draft {
  return {
    body: item.body,
    name: item.name,
    role: item.role,
    sortOrder: item.sortOrder,
  };
}

const EMPTY_DRAFT: Draft = { body: "", name: "", role: "", sortOrder: 0 };

export default function ReviewsEditor({ initialItems }: { initialItems: Review[] }) {
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
    const result = await adminFetch<Review>(`/api/admin/reviews/${id}`, {
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
    const result = await adminFetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (!result.ok) return setError(result.error);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function addItem() {
    setBusyId("new");
    setError(null);
    const result = await adminFetch<Review>("/api/admin/reviews", {
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

  return (
    <div className="mt-6">
      {error && <p className="mb-3 text-sm font-semibold text-brand-pink">{error}</p>}

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const draft = drafts[item.id] ?? toDraft(item);
          return (
            <div key={item.id} className="rounded-xl border border-line bg-white p-4">
              <textarea
                value={draft.body}
                onChange={(e) => updateDraft(item.id, { body: e.target.value })}
                rows={3}
                placeholder="What the customer said"
                className={`${inputClass} resize-y`}
              />
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.4fr_90px_auto] sm:items-center">
                <input
                  value={draft.name}
                  onChange={(e) => updateDraft(item.id, { name: e.target.value })}
                  placeholder="Name"
                  className={inputClass}
                />
                <input
                  value={draft.role}
                  onChange={(e) => updateDraft(item.id, { role: e.target.value })}
                  placeholder="Company, town"
                  className={inputClass}
                />
                <input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(e) =>
                    updateDraft(item.id, { sortOrder: Number(e.target.value) })
                  }
                  title="Order on the page"
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
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-line p-4">
        <textarea
          value={newDraft.body}
          onChange={(e) => setNewDraft({ ...newDraft, body: e.target.value })}
          rows={3}
          placeholder="What the customer said"
          className={`${inputClass} resize-y`}
        />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.4fr_90px_auto] sm:items-center">
          <input
            value={newDraft.name}
            onChange={(e) => setNewDraft({ ...newDraft, name: e.target.value })}
            placeholder="Name"
            className={inputClass}
          />
          <input
            value={newDraft.role}
            onChange={(e) => setNewDraft({ ...newDraft, role: e.target.value })}
            placeholder="Company, town"
            className={inputClass}
          />
          <input
            type="number"
            value={newDraft.sortOrder}
            onChange={(e) => setNewDraft({ ...newDraft, sortOrder: Number(e.target.value) })}
            title="Order on the page"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addItem}
            disabled={busyId === "new" || !newDraft.body.trim() || !newDraft.name.trim()}
            className="rounded-lg bg-tan px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
          >
            + Add review
          </button>
        </div>
      </div>
    </div>
  );
}
