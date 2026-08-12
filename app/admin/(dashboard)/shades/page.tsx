import { prisma } from "@/lib/prisma";
import { toShade } from "@/lib/mappers";
import ShadesEditor from "@/components/admin/ShadesEditor";

export const dynamic = "force-dynamic";

export default async function ShadesPage() {
  const rows = await prisma.shade.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Shades</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The colour swatches customers can pick from, grouped by category.
      </p>
      <ShadesEditor initialItems={rows.map(toShade)} />
    </div>
  );
}
