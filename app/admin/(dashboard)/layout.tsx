import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <aside className="w-56 shrink-0 overflow-y-auto border-r border-line bg-white">
        <AdminNav />
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
