import Ver3MarketingNav from '@/components/ver3/Ver3MarketingNav';

export default function Ver3MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Ver3MarketingNav />
      <main>{children}</main>
    </>
  );
}
