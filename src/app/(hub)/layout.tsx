import HubNav from '@/components/HubNav';

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HubNav />
      <main className="pt-16">{children}</main>
    </>
  );
}
