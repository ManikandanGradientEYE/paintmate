import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import ColourRoomsEditor from "@/components/admin/ColourRoomsEditor";

export const dynamic = "force-dynamic";

export default async function ColourPage() {
  const rows = await prisma.colourRoom.findMany({
    orderBy: { sortOrder: "asc" },
    include: { previews: true },
  });

  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Colour experience</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The room tabs and colour swatches in &quot;Get the experience of colour&quot; on
        the home page. Each colour needs a photo of that room painted in that shade —
        paste the image URL and the home page swaps to it when a visitor taps the swatch.
      </p>
      <ColourRoomsEditor initialRooms={rows.map(toColourRoom)} />
    </div>
  );
}
