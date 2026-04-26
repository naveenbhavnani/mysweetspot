export interface ReviewSummary {
  slug: string;
  title: string;
  sport: 'tennis' | 'badminton' | 'pickleball' | 'squash' | 'table-tennis';
  level?: string;
  priceRange: number; // budget ceiling in thousands (e.g. 5 = "under 5K")
  topPickName: string;
  topPickRating: number;
  topPickPrice: string;
}

const reviews: ReviewSummary[] = [
  {
    slug: 'best-tennis-rackets-for-beginners-india',
    title: 'Best Tennis Rackets for Beginners in India 2026',
    sport: 'tennis',
    level: 'Beginner',
    priceRange: 5,
    topPickName: 'Wilson Clash 100',
    topPickRating: 9.2,
    topPickPrice: '₹20,999',
  },
  {
    slug: 'best-tennis-rackets-under-5000-india',
    title: 'Best Tennis Rackets Under 5000 in India 2026',
    sport: 'tennis',
    level: 'Beginner',
    priceRange: 5,
    topPickName: 'HEAD Titanium Tour Pro',
    topPickRating: 9.5,
    topPickPrice: '₹3,237',
  },
  {
    slug: 'best-tennis-rackets-under-10000-india',
    title: 'Best Tennis Rackets Under 10000 in India 2026',
    sport: 'tennis',
    level: 'Beginner–Intermediate',
    priceRange: 10,
    topPickName: 'HEAD TI S6',
    topPickRating: 9.3,
    topPickPrice: '₹10,499',
  },
  {
    slug: 'best-tennis-rackets-under-20000-india',
    title: 'Best Tennis Rackets Under 20000 in India 2026',
    sport: 'tennis',
    level: 'Intermediate',
    priceRange: 20,
    topPickName: 'HEAD Radical Pro 2023',
    topPickRating: 9.4,
    topPickPrice: '₹17,708',
  },
  {
    slug: 'best-badminton-rackets-under-2000-india',
    title: 'Best Badminton Rackets Under 2000 in India 2026',
    sport: 'badminton',
    level: 'Beginner',
    priceRange: 2,
    topPickName: 'Yonex Nanoray Light 18i',
    topPickRating: 9.0,
    topPickPrice: '₹1,799',
  },
  {
    slug: 'best-badminton-rackets-under-5000-india',
    title: 'Best Badminton Rackets Under 5000 in India 2026',
    sport: 'badminton',
    level: 'Intermediate',
    priceRange: 5,
    topPickName: 'Yonex Astrox 77 Play',
    topPickRating: 9.5,
    topPickPrice: '₹2,890',
  },
  {
    slug: 'best-pickleball-paddles-under-2500-india',
    title: 'Best Pickleball Paddles Under 2500 in India 2026',
    sport: 'pickleball',
    level: 'Beginner',
    priceRange: 2.5,
    topPickName: 'Xtrieve USAPA T700 Carbon Fiber',
    topPickRating: 9.4,
    topPickPrice: '₹2,380',
  },
  {
    slug: 'best-pickleball-paddles-under-5000-india',
    title: 'Best Pickleball Paddles Under 5000 in India 2026',
    sport: 'pickleball',
    level: 'Beginner–Intermediate',
    priceRange: 5,
    topPickName: 'Voltik Alpha V1',
    topPickRating: 9.4,
    topPickPrice: '₹3,699',
  },
  {
    slug: 'best-pickleball-paddles-under-10000-india',
    title: 'Best Pickleball Paddles Under 10000 in India 2026',
    sport: 'pickleball',
    level: 'Intermediate',
    priceRange: 10,
    topPickName: 'YAIT Takumi GEN4',
    topPickRating: 9.5,
    topPickPrice: '₹7,979',
  },
  {
    slug: 'best-table-tennis-tables-india',
    title: 'Best Table Tennis Tables in India 2026',
    sport: 'table-tennis',
    priceRange: 20,
    topPickName: 'Step Over Tournament Pro 25mm',
    topPickRating: 9.6,
    topPickPrice: '₹18,499',
  },
];

export function getRelatedReviews(currentSlug: string): {
  sameSport: ReviewSummary[];
  otherSports: ReviewSummary[];
} {
  const current = reviews.find(r => r.slug === currentSlug);
  if (!current) return { sameSport: [], otherSports: [] };

  const sameSport = reviews
    .filter(r => r.sport === current.sport && r.slug !== currentSlug)
    .slice(0, 4);

  // One review per other sport, closest price range to current
  const otherSportNames = [...new Set(
    reviews.filter(r => r.sport !== current.sport).map(r => r.sport)
  )];

  const otherSports = otherSportNames.map(sport => {
    const candidates = reviews.filter(r => r.sport === sport);
    return candidates.reduce((closest, r) =>
      Math.abs(r.priceRange - current.priceRange) < Math.abs(closest.priceRange - current.priceRange)
        ? r : closest
    );
  });

  return { sameSport, otherSports };
}
