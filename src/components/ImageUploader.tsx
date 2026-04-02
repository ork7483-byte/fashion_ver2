'use client';

import { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onUpload?: (file: File) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload?.(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (preview) {
    return (
      <div className="relative rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <span className="text-[#8C857B] text-sm">업로드된 이미지</span>
        </div>
        <button
          onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; }}
          className="absolute top-2 right-2 w-6 h-6 rounded-sm bg-[#2C2825]/60 text-white text-xs flex items-center justify-center hover:bg-[#2C2825]/80"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-sm border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-[#D4572A] bg-[#FDF5F2]' : 'border-[#E2DDD4] bg-white hover:border-[#8C857B]'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <div className="text-3xl mb-3 text-[#B5AFA6]">📷</div>
      <p className="text-sm font-medium text-[#2C2825] mb-1">제품 이미지를 끌어다 놓으세요</p>
      <p className="text-xs text-[#8C857B]">또는 클릭하여 파일 선택</p>
    </div>
  );
}
