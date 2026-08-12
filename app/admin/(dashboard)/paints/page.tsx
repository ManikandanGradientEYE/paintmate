import { prisma } from "@/lib/prisma";
import { toPaint } from "@/lib/mappers";
import PaintsEditor from "@/components/admin/PaintsEditor";

export const dynamic = "force-dynamic";

export default async function PaintsPage() {
  const rows = await prisma.paint.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Paints</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Jiwan Paints (recommended) and other brands shown in "Choose your paint".
      </p>
      <PaintsEditor initialItems={rows.map(toPaint)} />
    </div>
  );
}
