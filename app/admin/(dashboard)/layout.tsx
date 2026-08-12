import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="w-56 shrink-0 border-r border-line bg-white">
        <AdminNav />
      </aside>
      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
