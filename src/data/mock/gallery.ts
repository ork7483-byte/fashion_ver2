import { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  { beforeImage: '', afterImage: '', category: 'TOP', label: '여성 블라우스' },
  { beforeImage: '', afterImage: '', category: 'TOP', label: '남성 셔츠' },
  { beforeImage: '', afterImage: '', category: 'BOTTOM', label: '데님 팬츠' },
  { beforeImage: '', afterImage: '', category: 'BOTTOM', label: '슬랙스' },
  { beforeImage: '', afterImage: '', category: 'BAG', label: '토트백' },
  { beforeImage: '', afterImage: '', category: 'BAG', label: '크로스백' },
  { beforeImage: '', afterImage: '', category: 'SHOES', label: '스니커즈' },
  { beforeImage: '', afterImage: '', category: 'SHOES', label: '로퍼' },
];

export const galleryCategories = ['ALL', 'TOP', 'BOTTOM', 'BAG', 'SHOES'] as const;
