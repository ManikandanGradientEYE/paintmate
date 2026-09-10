import { prisma } from "@/lib/prisma";
import { toReview } from "@/lib/mappers";
import ReviewsEditor from "@/components/admin/ReviewsEditor";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const rows = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Customer reviews</h1>
      <p className="mt-1 max-w-3xl text-sm text-ink-muted">
        The cards in &quot;Know from our customers&quot; on the home page. They appear in
        order — lower numbers first. Delete them all and the section disappears from the
        page rather than showing an empty row.
      </p>
      <ReviewsEditor initialItems={rows.map(toReview)} />
    </div>
  );
}
