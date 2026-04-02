export interface GalleryItem {
  beforeImage: string;
  afterImage: string;
  category: string;
  label?: string;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { name: string; included: boolean; detail?: string }[];
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface AppFeature {
  icon: string;
  title: string;
  description: string;
}
