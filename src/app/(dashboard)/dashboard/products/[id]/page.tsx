'use client';

import { use, useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { mockProducts, mockCategories } from '@/data/mock/ver3-products';

const IMAGE_GRADIENTS = [
  'from-stone-200 to-stone-300',
  'from-rose-100 to-rose-200',
  'from-amber-100 to-amber-200',
  'from-sky-100 to-sky-200',
];

const IMAGE_LABELS = ['누끼컷', '모델컷', '연출컷', '상세페이지'];

export default function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id) ?? mockProducts[0];

  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [salePrice, setSalePrice] = useState(String(product.salePrice ?? ''));
  const [categoryId, setCategoryId] = useState(product.categoryId ?? '');
  const [description, setDescription] = useState(product.description ?? '');
  const [sizes, setSizes] = useState(
    product.options?.find((o) => o.name === '사이즈')?.values.join(', ') ?? ''
  );
  const [colors, setColors] = useState(
    product.options?.find((o) => o.name === '색상')?.values.join(', ') ?? ''
  );
  const [hoverEnabled, setHoverEnabled] = useState(product.hoverEnabled);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleRegenerate = (type: string) => {
    setIsGenerating(type);
    setTimeout(() => setIsGenerating(null), 2000);
  };

  const handleSave = () => {
    alert('저장되었습니다!');
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Catalog</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">상품 편집</h1>
        <p className="text-xs text-[#8C857B] mt-1">{product.name}</p>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">기본 정보</p>
        </div>
        <div className="p-6 space-y-5">
          {/* 상품명 */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">상품명</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
            />
          </div>

          {/* 가격 + 할인가 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">가격 (원)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">할인가 (원)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="할인가 없음"
                className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
              />
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">카테고리</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none bg-white"
            >
              <option value="">카테고리 선택</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">상품 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none resize-none"
            />
          </div>

          {/* 옵션 */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">옵션</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[#8C857B] mb-1">사이즈 (쉼표로 구분)</p>
                <input
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                />
              </div>
              <div>
                <p className="text-[11px] text-[#8C857B] mb-1">색상 (쉼표로 구분)</p>
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 이미지 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">상품 이미지</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {IMAGE_LABELS.map((label, idx) => (
              <div key={label} className="space-y-2">
                <p className="text-xs font-medium text-[#4A4540]">{label}</p>
                <div
                  className={`w-full aspect-square rounded-sm bg-gradient-to-br ${IMAGE_GRADIENTS[idx]} flex items-center justify-center`}
                >
                  <p className="text-xs text-[#8C857B]">{label}</p>
                </div>
                <button className="w-full py-1.5 text-xs font-medium border border-[#E2DDD4] rounded-sm text-[#4A4540] hover:border-[#D4572A] hover:text-[#D4572A] transition-colors">
                  이미지 변경
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI 재생성 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">AI 재생성</p>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-xs text-[#8C857B] mb-4">AI로 이미지를 다시 생성합니다. 기존 이미지는 교체됩니다.</p>
          <div className="flex flex-col gap-3">
            {[
              { type: 'modelCut', label: '모델컷 재생성' },
              { type: 'styledCut', label: '연출컷 재생성' },
              { type: 'detailPage', label: '상세페이지 재생성' },
            ].map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleRegenerate(type)}
                disabled={isGenerating === type}
                className="w-full py-2.5 text-sm font-medium border border-[#D4572A] text-[#D4572A] rounded-sm hover:bg-[#FDF5F2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating === type ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#D4572A]/30 border-t-[#D4572A] rounded-full animate-spin" />
                    생성 중...
                  </>
                ) : (
                  label
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 호버 전환 설정 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <label className="flex items-center gap-4 cursor-pointer">
          <div
            onClick={() => setHoverEnabled((v) => !v)}
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
              hoverEnabled ? 'bg-[#D4572A]' : 'bg-[#D4CFC6]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                hoverEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C2825]">호버 전환 활성화</p>
            <p className="text-[11px] text-[#8C857B] mt-0.5">상품 카드 마우스 오버 시 모델컷으로 자동 전환</p>
          </div>
        </label>
      </div>

      {/* 하단 버튼 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex-1 py-3 bg-[#D4572A] text-white text-sm font-bold rounded-sm hover:bg-[#BF4D24] transition-colors"
        >
          저장하기
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-3 text-sm font-medium text-[#B33D3D] border border-[#B33D3D]/30 rounded-sm hover:bg-[#FDF5F2] transition-colors"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
