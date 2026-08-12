import { prisma } from "@/lib/prisma";
import { toLead } from "@/lib/mappers";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const leads = rows.map(toLead);

  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Leads</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Everyone who requested a quote on the site, newest first.
      </p>
      <LeadsTable initialLeads={leads} />
    </div>
  );
}
