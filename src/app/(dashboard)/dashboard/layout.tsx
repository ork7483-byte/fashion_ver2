import DashboardSidebar from '@/components/ver3/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F1EB]">
      <DashboardSidebar />
      <main className="ml-[260px] p-8">{children}</main>
    </div>
  );
}
