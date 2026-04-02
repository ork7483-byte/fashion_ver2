'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ResultCanvas from '@/components/ResultCanvas';
import { modelPresets, categoryOptions } from '@/data/mock/features';

export default function ModelCutPage() {
  const [selectedCategory, setSelectedCategory] = useState('상의');
  const [selectedModel, setSelectedModel] = useState('model-1');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 11000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-[#2C2825] mb-6">모델컷 변환</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Upload */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C857B] mb-3">제품 이미지</h3>
            <ImageUploader />
          </div>

          {/* Category */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C857B] mb-3">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#D4572A] text-white'
                      : 'bg-white text-[#8C857B] border border-[#E2DDD4] hover:text-[#2C2825]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Model Preset */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C857B] mb-3">모델 선택</h3>
            <div className="grid grid-cols-3 gap-2">
              {modelPresets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`aspect-square rounded-sm border flex items-center justify-center text-xs font-medium transition-all ${
                    selectedModel === m.id
                      ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                      : 'border-[#E2DDD4] bg-white text-[#8C857B] hover:border-[#8C857B]'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-sm bg-[#D4572A] text-white font-semibold hover:bg-[#BF4D24] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all duration-150"
          >
            {isGenerating ? 'AI 생성 중...' : '생성하기'}
          </button>
        </div>

        {/* Center Canvas */}
        <div>
          <ResultCanvas isGenerating={isGenerating} onGenerate={handleGenerate} />
        </div>
      </div>
    </div>
  );
}
