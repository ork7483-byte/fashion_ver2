import AppSidebar from '@/components/AppSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F4F1EB]">
      <AppSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
