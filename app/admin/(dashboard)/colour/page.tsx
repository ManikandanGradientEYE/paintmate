import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import ColourRoomsEditor from "@/components/admin/ColourRoomsEditor";

export const dynamic = "force-dynamic";

export default async function ColourPage() {
  const rows = await prisma.colourRoom.findMany({
    orderBy: { sortOrder: "asc" },
    include: { swatches: true },
  });

  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Colour experience</h1>
      <p className="mt-1 max-w-3xl text-sm text-ink-muted">
        The room tabs and colour swatches in &quot;Get the experience of colour&quot; on the
        home page. Give each room <strong>one PNG with a transparent wall</strong> — the
        selected swatch colour is painted behind it, so visitors see the same room in
        every shade. Anything opaque in the PNG (furniture, floor, ceiling) keeps its own
        colour.
      </p>
      <ColourRoomsEditor initialRooms={rows.map(toColourRoom)} />
    </div>
  );
}
