import type { ProductDetail, ReviewData } from '../types/review';

const SITE_URL = 'https://mysweetspot.in';
const SITE_NAME = 'MySweetSpot';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const KNOWN_BRANDS = [
  'HEAD', 'Wilson', 'Yonex', 'Li-Ning', 'Victor', 'Voltik', 'Xtrieve',
  'YAIT', 'Step Over', 'Cosco', 'Nivia', 'Stag', 'GKI', 'Butterfly',
  'Joola', 'Donic', 'Killerspin', 'SELKIRK', 'ONIX', 'Babolat', 'Prince',
];

export function parseINRPrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}

export function extractBrand(name: string): string {
  for (const brand of KNOWN_BRANDS) {
    if (name.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }
  return name.split(' ')[0];
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
  };
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${opts.url}`,
    url: `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
  };
}

export function collectionPageSchema(opts: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${opts.url}`,
    url: `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function productSchema(product: ProductDetail, reviewSlug: string) {
  const price = parseINRPrice(product.price);
  const brand = extractBrand(product.name);

  return {
    '@type': 'Product',
    name: product.name,
    description: product.tagline,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: product.buyUrl,
      priceCurrency: 'INR',
      price,
      availability: 'https://schema.org/InStock',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.overallRating,
        bestRating: 10,
        worstRating: 0,
      },
      author: { '@id': ORG_ID },
      reviewBody: product.reviewText ?? product.tagline,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.overallRating,
      bestRating: 10,
      worstRating: 0,
      reviewCount: 1,
    },
  };
}

export function reviewArticleSchema(opts: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${SITE_URL}${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    ...(opts.image && { image: opts.image }),
  };
}

export function productItemListSchema(products: ProductDetail[], reviewSlug: string) {
  return {
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/reviews/${reviewSlug}#${p.name.toLowerCase().replace(/\s+/g, '-')}`,
    })),
  };
}

export function aboutPageSchema(opts: { url: string; name: string; description: string }) {
  return {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}${opts.url}`,
    url: `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
  };
}

export function buildGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/** Build the review-page-specific JSON-LD nodes (without Organization/WebSite — those are added by BaseLayout) */
export function buildReviewPageNodes(review: ReviewData): object[] {
  const slug = review.meta.slug;
  const url = `/reviews/${slug}`;

  const sportDisplayNames: Record<string, string> = {
    tennis: 'Tennis',
    badminton: 'Badminton',
    pickleball: 'Pickleball',
    squash: 'Squash',
    'table-tennis': 'Table Tennis',
  };
  const sportName = sportDisplayNames[review.meta.sport] ?? review.meta.sport;

  return [
    reviewArticleSchema({
      url,
      title: review.meta.title,
      description: review.meta.description,
      datePublished: review.meta.lastUpdated,
      dateModified: review.meta.lastUpdated,
      image: review.topPick.image,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: sportName, url: `/${review.meta.sport}` },
      { name: review.meta.title, url },
    ]),
    faqSchema(review.faq),
    productItemListSchema(review.products, slug),
    ...review.products.map((p) => productSchema(p, slug)),
  ];
}
