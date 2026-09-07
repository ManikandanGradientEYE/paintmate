"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { ColourPreview, ColourRoom } from "@/types";

const EMPTY_SWATCH = { hex: "#CFBCC3", imageUrl: "" };

export default function ColourRoomsEditor({
  initialRooms,
}: {
  initialRooms: ColourRoom[];
}) {
  const [rooms, setRooms] = useState(initialRooms);
  const [newRoomName, setNewRoomName] = useState("");
  const [drafts, setDrafts] = useState<Record<string, { hex: string; imageUrl: string }>>(
    Object.fromEntries(
      initialRooms.flatMap((r) =>
        r.previews.map((p) => [p.id, { hex: p.hex, imageUrl: p.imageUrl }])
      )
    )
  );
  const [newSwatch, setNewSwatch] = useState<Record<string, typeof EMPTY_SWATCH>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function patchDraft(id: string, patch: Partial<{ hex: string; imageUrl: string }>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  }

  async function addRoom() {
    if (!newRoomName.trim()) return;
    setBusy("new-room");
    setError(null);
    const result = await adminFetch<ColourRoom>("/api/admin/colour-rooms", {
      method: "POST",
      body: JSON.stringify({ name: newRoomName, sortOrder: rooms.length }),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) => [...prev, result.data]);
    setNewRoomName("");
  }

  async function renameRoom(id: string, name: string) {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, name } : r)));
  }

  async function saveRoom(room: ColourRoom) {
    setBusy(room.id);
    setError(null);
    const result = await adminFetch<ColourRoom>(`/api/admin/colour-rooms/${room.id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: room.name }),
    });
    setBusy(null);
    if (!result.ok) setError(result.error);
  }

  async function deleteRoom(id: string) {
    setBusy(id);
    const result = await adminFetch(`/api/admin/colour-rooms/${id}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }

  async function addSwatch(roomId: string) {
    const draft = newSwatch[roomId] ?? EMPTY_SWATCH;
    if (!draft.imageUrl.trim()) {
      setError("Add the image URL for the new colour first.");
      return;
    }
    setBusy(`add-${roomId}`);
    setError(null);
    const room = rooms.find((r) => r.id === roomId);
    const result = await adminFetch<ColourPreview>("/api/admin/colour-previews", {
      method: "POST",
      body: JSON.stringify({
        roomId,
        hex: draft.hex,
        imageUrl: draft.imageUrl,
        sortOrder: room?.previews.length ?? 0,
      }),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, previews: [...r.previews, result.data] } : r
      )
    );
    setDrafts((prev) => ({
      ...prev,
      [result.data.id]: { hex: result.data.hex, imageUrl: result.data.imageUrl },
    }));
    setNewSwatch((prev) => ({ ...prev, [roomId]: EMPTY_SWATCH }));
  }

  async function saveSwatch(id: string) {
    setBusy(id);
    setError(null);
    const result = await adminFetch<ColourPreview>(`/api/admin/colour-previews/${id}`, {
      method: "PATCH",
      body: JSON.stringify(drafts[id]),
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) =>
      prev.map((r) => ({
        ...r,
        previews: r.previews.map((p) => (p.id === id ? result.data : p)),
      }))
    );
  }

  async function deleteSwatch(roomId: string, id: string) {
    setBusy(id);
    const result = await adminFetch(`/api/admin/colour-previews/${id}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, previews: r.previews.filter((p) => p.id !== id) }
          : r
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
          const draftNew = newSwatch[room.id] ?? EMPTY_SWATCH;
          return (
            <div key={room.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={room.name}
                  onChange={(e) => renameRoom(room.id, e.target.value)}
                  placeholder="Room name"
                  className={`${inputClass} flex-1 font-bold`}
                />
                <button
                  type="button"
                  onClick={() => saveRoom(room)}
                  disabled={busy === room.id}
                  className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  Save name
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

              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
                Colours &amp; preview images
              </p>

              <div className="mt-2 flex flex-col gap-2">
                {room.previews.map((preview) => {
                  const draft = drafts[preview.id] ?? {
                    hex: preview.hex,
                    imageUrl: preview.imageUrl,
                  };
                  return (
                    <div
                      key={preview.id}
                      className="flex flex-wrap items-center gap-2 rounded-lg bg-cream p-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={draft.imageUrl || "/assets/room.jpg"}
                        alt=""
                        className="h-12 w-16 shrink-0 rounded border border-line object-cover"
                      />
                      <input
                        type="color"
                        value={draft.hex}
                        onChange={(e) => patchDraft(preview.id, { hex: e.target.value })}
                        className="h-9 w-9 shrink-0 cursor-pointer rounded border border-line p-0.5"
                      />
                      <input
                        value={draft.hex}
                        onChange={(e) => patchDraft(preview.id, { hex: e.target.value })}
                        className={`${inputClass} w-[110px]`}
                      />
                      <input
                        value={draft.imageUrl}
                        onChange={(e) =>
                          patchDraft(preview.id, { imageUrl: e.target.value })
                        }
                        placeholder="Image URL (PNG/JPG)"
                        className={`${inputClass} min-w-[200px] flex-1`}
                      />
                      <button
                        type="button"
                        onClick={() => saveSwatch(preview.id)}
                        disabled={busy === preview.id}
                        className="rounded-lg bg-forest px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSwatch(room.id, preview.id)}
                        disabled={busy === preview.id}
                        className="rounded-lg bg-[#F7CFDD] px-3 py-2 text-xs font-bold text-ink disabled:opacity-60"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* add a colour */}
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-line p-2">
                <input
                  type="color"
                  value={draftNew.hex}
                  onChange={(e) =>
                    setNewSwatch((prev) => ({
                      ...prev,
                      [room.id]: { ...draftNew, hex: e.target.value },
                    }))
                  }
                  className="h-9 w-9 shrink-0 cursor-pointer rounded border border-line p-0.5"
                />
                <input
                  value={draftNew.hex}
                  onChange={(e) =>
                    setNewSwatch((prev) => ({
                      ...prev,
                      [room.id]: { ...draftNew, hex: e.target.value },
                    }))
                  }
                  className={`${inputClass} w-[110px]`}
                />
                <input
                  value={draftNew.imageUrl}
                  onChange={(e) =>
                    setNewSwatch((prev) => ({
                      ...prev,
                      [room.id]: { ...draftNew, imageUrl: e.target.value },
                    }))
                  }
                  placeholder="Image URL for this colour"
                  className={`${inputClass} min-w-[200px] flex-1`}
                />
                <button
                  type="button"
                  onClick={() => addSwatch(room.id)}
                  disabled={busy === `add-${room.id}`}
                  className="rounded-lg bg-pale px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
                >
                  + Add colour
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-line p-4">
        <input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name (e.g. Balcony)"
          className={`${inputClass} flex-1`}
        />
        <button
          type="button"
          onClick={addRoom}
          disabled={busy === "new-room" || !newRoomName.trim()}
          className="rounded-lg bg-pale px-4 py-2 text-xs font-bold text-ink disabled:opacity-60"
        >
          + Add room
        </button>
      </div>
    </div>
  );
}
