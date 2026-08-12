import { prisma } from "@/lib/prisma";
import { toAddOn } from "@/lib/mappers";
import AddOnsEditor from "@/components/admin/AddOnsEditor";

export const dynamic = "force-dynamic";

export default async function AddOnsPage() {
  const rows = await prisma.addOn.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Add-ons</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The toggle chips under "Choose your paint" (wall putty, primer, painter).
      </p>
      <AddOnsEditor initialItems={rows.map(toAddOn)} />
    </div>
  );
}
