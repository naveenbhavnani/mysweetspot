export interface ProductSpec {
  weight?: string;
  balance?: string;
  headSize?: string;
  stringPattern?: string;
  material?: string;
  flexibility?: string;
  level?: string;
  [key: string]: string | undefined;
}

export interface ComparisonProduct {
  name: string;
  rating: number;
  price: string;
  buyUrl: string;
  badge?: string;
  specs: ProductSpec;
}

export interface RatingCategory {
  label: string;
  score: number;
}

export interface RatingCriterion {
  label: string;
  weight: number;
  description: string;
  icon?: string;
}

export interface ProductDetail {
  name: string;
  tagline: string;
  image: string;
  images?: string[];
  overallRating: number;
  price: string;
  buyUrl: string;
  badge?: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  ratingBreakdown?: RatingCategory[];
  reviewText?: string;
}

export interface TopPickData {
  name: string;
  tagline: string;
  image: string;
  rating: number;
  price: string;
  buyUrl: string;
  highlights: string[];
  badge?: string;
}

export interface ReviewData {
  meta: {
    title: string;
    description: string;
    sport: 'tennis' | 'badminton' | 'pickleball' | 'squash';
    level?: string;
    lastUpdated: string;
    slug: string;
  };
  topPick: TopPickData;
  intro: string[];
  comparisonProducts: ComparisonProduct[];
  ratingCriteria: {
    note?: string;
    criteria: RatingCriterion[];
  };
  products: ProductDetail[];
  buyingGuide: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}
