import { prisma } from "@/lib/prisma";
import { toSocialLink } from "@/lib/mappers";
import SocialLinksEditor from "@/components/admin/SocialLinksEditor";

export const dynamic = "force-dynamic";

export default async function ConnectPage() {
  const rows = await prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-extrabold text-forest">Connect with us</h1>
      <p className="mt-1 max-w-3xl text-sm text-ink-muted">
        The icons in the footer of every page. Each needs a full address starting with
        https://, and opens in a new tab. The platform picks which icon is drawn, so add
        one row per account.
      </p>
      <SocialLinksEditor initialItems={rows.map(toSocialLink)} />
    </div>
  );
}
