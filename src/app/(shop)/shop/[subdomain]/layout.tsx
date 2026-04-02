import ShopHeader from '@/components/ver3/ShopHeader';
import { mockShop, mockCategories } from '@/data/mock/ver3-products';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader shop={mockShop} categories={mockCategories} cartCount={0} />
      <main>{children}</main>
      {/* Footer */}
      <footer className="border-t border-[#E2DDD4] py-8 px-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <p className="text-xs text-[#8C857B]">{mockShop.shopName}</p>
          <p className="text-[11px] text-[#B5AFA6] mt-1">
            Powered by <span className="font-semibold text-[#D4572A]">VisionShop</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
