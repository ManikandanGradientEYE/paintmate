import { prisma } from "@/lib/prisma";
import { toHomeSize } from "@/lib/mappers";
import HomeSizesEditor from "@/components/admin/HomeSizesEditor";

export const dynamic = "force-dynamic";

export default async function HomeSizesPage() {
  const rows = await prisma.homeSize.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Home sizes</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The size cards shown on "What size is your home?" — selecting one sets the wall
        area.
      </p>
      <HomeSizesEditor initialItems={rows.map(toHomeSize)} />
    </div>
  );
}
