"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/paints", label: "Paints" },
  { href: "/admin/shades", label: "Shades" },
  { href: "/admin/home-sizes", label: "Home sizes" },
  { href: "/admin/add-ons", label: "Add-ons" },
  { href: "/admin/catalog", label: "Catalog" },
  { href: "/admin/pricing", label: "Pricing" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="px-4 py-5">
          <p className="text-lg font-extrabold text-forest">Paint Mate</p>
          <p className="text-xs font-semibold text-ink-faint">Admin</p>
        </div>
        <nav className="flex flex-col gap-0.5 px-2">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-forest text-white" : "text-ink-muted hover:bg-tan"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-2">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-tan"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-brand-pink hover:bg-rose"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
