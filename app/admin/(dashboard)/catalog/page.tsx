import { prisma } from "@/lib/prisma";
import { toCatalogProduct } from "@/lib/mappers";
import CatalogEditor from "@/components/admin/CatalogEditor";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const rows = await prisma.catalogProduct.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Catalog</h1>
      <p className="mt-1 text-sm text-ink-muted">
        The "More from Jiwan Paints" grid at the bottom of the site.
      </p>
      <CatalogEditor initialItems={rows.map(toCatalogProduct)} />
    </div>
  );
}
