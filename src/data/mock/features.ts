import { AppFeature } from '@/types';

export const appFeatures: AppFeature[] = [
  { icon: '📸', title: '모델컷 변환', description: '바닥컷/누끼 사진을 올리면 AI 모델이 착장한 스튜디오급 이미지로 변환' },
  { icon: '👗', title: '가상피팅', description: '의상 + 모델 + 포즈 + 배경을 자유롭게 조합하여 룩북 생성' },
  { icon: '🎬', title: '영상 변환', description: '룩북 이미지를 SNS용 짧은 영상으로 자동 변환' },
  { icon: '🖼️', title: '연출컷 생성', description: '제품 이미지를 스튜디오급 연출 사진으로 업그레이드' },
];

export const modelPresets = [
  { id: 'model-1', name: '모델 A' },
  { id: 'model-2', name: '모델 B' },
  { id: 'model-3', name: '모델 C' },
  { id: 'model-4', name: '모델 D' },
  { id: 'model-5', name: '모델 E' },
  { id: 'model-6', name: '모델 F' },
];

export const categoryOptions = ['상의', '하의', '원피스', '가방', '신발', '액세서리'] as const;
