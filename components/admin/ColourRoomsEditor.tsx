"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { ColourRoom, ColourSwatch } from "@/types";

const NEW_HEX = "#CFBCC3";

export default function ColourRoomsEditor({
  initialRooms,
}: {
  initialRooms: ColourRoom[];
}) {
  const [rooms, setRooms] = useState(initialRooms);
  const [drafts, setDrafts] = useState<Record<string, { name: string; imageUrl: string }>>(
    Object.fromEntries(
      initialRooms.map((r) => [r.id, { name: r.name, imageUrl: r.imageUrl }])
    )
  );
  const [newRoom, setNewRoom] = useState({ name: "", imageUrl: "" });
  const [newHex, setNewHex] = useState<Record<string, string>>({});
  /** which swatch is being previewed behind the PNG, per room */
  const [previewHex, setPreviewHex] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function patchRoom(id: string, patch: Partial<{ name: string; imageUrl: string }>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  }

  async function saveRoom(id: string) {
    setBusy(id);
    setError(null);
    const result = await adminFetch<ColourRoom>(`/api/admin/colour-rooms/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) => prev.map((r) => (r.id === id ? result.data : r)));
  }

  async function deleteRoom(id: string) {
    setBusy(id);
    const result = await adminFetch(`/api/admin/colour-rooms/${id}`, { method: "DELETE" });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }

  async function addRoom() {
    if (!newRoom.name.trim() || !newRoom.imageUrl.trim()) {
      setError("A new room needs both a name and a transparent PNG URL.");
      return;
    }
    setBusy("new-room");
    setError(null);
    const result = await adminFetch<ColourRoom>("/api/admin/colour-rooms", {
      method: "POST",
      body: JSON.stringify({ ...newRoom, sortOrder: rooms.length }),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) => [...prev, result.data]);
    setDrafts((prev) => ({
      ...prev,
      [result.data.id]: { name: result.data.name, imageUrl: result.data.imageUrl },
    }));
    setNewRoom({ name: "", imageUrl: "" });
  }

  async function addSwatch(roomId: string) {
    const hex = newHex[roomId] ?? NEW_HEX;
    setBusy(`add-${roomId}`);
    setError(null);
    const room = rooms.find((r) => r.id === roomId);
    const result = await adminFetch<ColourSwatch>("/api/admin/colour-swatches", {
      method: "POST",
      body: JSON.stringify({ roomId, hex, sortOrder: room?.swatches.length ?? 0 }),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, swatches: [...r.swatches, result.data] } : r
      )
    );
    setNewHex((prev) => ({ ...prev, [roomId]: NEW_HEX }));
  }

  async function updateSwatch(roomId: string, id: string, hex: string) {
    // optimistic — the colour input fires continuously while dragging
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, swatches: r.swatches.map((s) => (s.id === id ? { ...s, hex } : s)) }
          : r
      )
    );
  }

  async function saveSwatch(id: string, hex: string) {
    setBusy(id);
    const result = await adminFetch(`/api/admin/colour-swatches/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ hex }),
    });
    setBusy(null);
    if (!result.ok) setError(result.error);
  }

  async function deleteSwatch(roomId: string, id: string) {
    setBusy(id);
    const result = await adminFetch(`/api/admin/colour-swatches/${id}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, swatches: r.swatches.filter((s) => s.id !== id) } : r
      )
    );
  }

  const inputClass =
    "rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest";

  return (
    <div className="mt-6">
      {error && <p className="mb-3 text-sm font-semibold text-[#C2410C]">{error}</p>}

      <div className="flex flex-col gap-4">
        {rooms.map((room) => {
          const draft = drafts[room.id] ?? { name: room.name, imageUrl: room.imageUrl };
          const shown = previewHex[room.id] ?? room.swatches[0]?.hex ?? "#FFFFFF";
          return (
            <div key={room.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* live preview: swatch colour behind the transparent PNG */}
                <div
                  className="h-[150px] w-full shrink-0 overflow-hidden rounded-lg border border-line transition-colors sm:w-[220px]"
                  style={{ backgroundColor: shown }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={draft.imageUrl || "/assets/room.jpg"}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label className="block text-xs font-bold text-ink-muted">
                    Room name
                  </label>
                  <input
                    value={draft.name}
                    onChange={(e) => patchRoom(room.id, { name: e.target.value })}
                    className={`${inputClass} mt-1 w-full font-bold`}
                  />

                  <label className="mt-3 block text-xs font-bold text-ink-muted">
                    Transparent PNG URL
                  </label>
                  <input
                    value={draft.imageUrl}
                    onChange={(e) => patchRoom(room.id, { imageUrl: e.target.value })}
                    placeholder="https://…/living-room.png"
                    className={`${inputClass} mt-1 w-full`}
                  />
                  <p className="mt-1 text-xs text-ink-muted">
                    The wall area must be transparent — the selected colour is painted
                    behind it.
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveRoom(room.id)}
                      disabled={busy === room.id}
                      className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                    >
                      Save room
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRoom(room.id)}
                      disabled={busy === room.id}
                      className="rounded-lg bg-[#F7CFDD] px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
                    >
                      Delete room
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-muted">
                Colours — click one to preview it above
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {room.swatches.map((swatch) => (
                  <div key={swatch.id} className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewHex((prev) => ({ ...prev, [room.id]: swatch.hex }))
                      }
                      className={`h-10 w-14 rounded-lg border-2 ${
                        shown === swatch.hex ? "border-forest" : "border-line"
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={`Preview ${swatch.hex}`}
                    />
                    <input
                      type="color"
                      value={swatch.hex}
                      onChange={(e) => updateSwatch(room.id, swatch.id, e.target.value)}
                      onBlur={(e) => saveSwatch(swatch.id, e.target.value)}
                      className="h-6 w-14 cursor-pointer rounded border border-line p-0.5"
                      title="Change colour"
                    />
                    <button
                      type="button"
                      onClick={() => deleteSwatch(room.id, swatch.id)}
                      disabled={busy === swatch.id}
                      className="text-[11px] font-bold text-[#C2410C] disabled:opacity-60"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex flex-col items-center gap-1">
                  <input
                    type="color"
                    value={newHex[room.id] ?? NEW_HEX}
                    onChange={(e) =>
                      setNewHex((prev) => ({ ...prev, [room.id]: e.target.value }))
                    }
                    className="h-10 w-14 cursor-pointer rounded-lg border border-dashed border-line p-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => addSwatch(room.id)}
                    disabled={busy === `add-${room.id}`}
                    className="rounded bg-pale px-2 py-1 text-[11px] font-bold text-ink disabled:opacity-60"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-line p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
          Add a room
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            placeholder="Room name (e.g. Balcony)"
            className={`${inputClass} w-[220px]`}
          />
          <input
            value={newRoom.imageUrl}
            onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
            placeholder="Transparent PNG URL"
            className={`${inputClass} min-w-[220px] flex-1`}
          />
          <button
            type="button"
            onClick={addRoom}
            disabled={busy === "new-room"}
            className="rounded-lg bg-pale px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
          >
            + Add room
          </button>
        </div>
      </div>
    </div>
  );
}
