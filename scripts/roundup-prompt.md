# MySweetSpot Roundup Generator

You are creating a product roundup review page for MySweetSpot (mysweetspot.in), a racket sports review site for Indian players covering badminton, tennis, pickleball, and table tennis.

## Input

- **Slug:** {{SLUG}}
- **Title:** {{TITLE}}
- **Amazon URLs:** {{URLS}}

## Working Directory

You are in `/Users/naveenbhavnani/personal/mysweetspot` — an Astro project.

## Step 1: Research products (PA-API + Playwright)

You MUST use BOTH data sources for each product. PA-API gives structured data but misses prices and some specs. Playwright gives you the full Amazon product page.

### Step 1a: PA-API batch fetch

Extract ASINs from the URLs (the 10-char alphanumeric code, e.g. `B0CXQ8R7G2`).

Write and run a temporary script `scripts/fetch-{{SLUG}}.mjs`:

```js
import "dotenv/config";
import amazonPaapi from "amazon-paapi";

const commonParameters = {
  AccessKey: process.env.AMAZON_PA_API_ACCESS_KEY,
  SecretKey: process.env.AMAZON_PA_API_SECRET_KEY,
  PartnerTag: process.env.AMAZON_PA_API_PARTNER_TAG,
  PartnerType: "Associates",
  Marketplace: "www.amazon.in",
};

const requestParameters = {
  ItemIds: [/* all ASINs here, max 10 per request */],
  ItemIdType: "ASIN",
  Condition: "New",
  Resources: [
    "ItemInfo.Title",
    "ItemInfo.Features",
    "ItemInfo.ProductInfo",
    "ItemInfo.TechnicalInfo",
    "ItemInfo.ManufactureInfo",
    "Offers.Listings.Price",
    "Images.Primary.Large",
    "Images.Variants.Large",
    "BrowseNodeInfo.BrowseNodes",
  ],
};

const data = await amazonPaapi.GetItems(commonParameters, requestParameters);
console.log(JSON.stringify(data.ItemsResult.Items, null, 2));
```

If more than 10 ASINs, split into multiple requests with a 1-second delay between them.

Delete the script after running.

### Step 1b: Playwright scraping for EACH product

PA-API often misses prices and detailed specs. For EVERY product, use Playwright to visit the Amazon page and extract:

1. **Price** (incl. GST) — look for the price table with MRP, selling price, and discount
2. **Star rating and review count** — e.g. "3.8 out of 5 stars", "(1,774)"
3. **Detailed specs** — from the product info section (weight, balance, flexibility, head size, string pattern, material, grip size, shaft material, string tension range, etc.)
4. **"Bought in past month"** count if shown

For each product URL:
```
1. Use mcp__playwright__browser_navigate to go to the URL
2. Use mcp__playwright__browser_snapshot to capture the page
3. Extract price, rating, review count, specs from the snapshot
```

Important Playwright notes:
- The browser is pre-authenticated with Amazon — it will work, do NOT skip this step
- Process ONE product at a time to avoid overwhelming the browser
- Wait 2-3 seconds between products (use a brief pause)
- Save the extracted data before moving to the next product
- If a page fails to load, retry once, then skip that product

### Step 1c: Merge data

For each product, combine PA-API data (images, features, bullet points) with Playwright data (price, star rating, review count, detailed specs) into a complete product profile.

## Step 2: Analyze and rate products

Based on the merged data:

1. Choose 4-5 rating criteria relevant to this product type. Sport-specific examples:

   **Badminton rackets:**
   - Speed (swing speed, recovery, manoeuvrability)
   - Control (placement accuracy, drops, net shots)
   - Power (smash power, clear distance)
   - Durability (frame integrity, grommet quality)
   - Value (performance relative to price)

   **Tennis rackets:**
   - Power & Spin (groundstroke depth, spin potential)
   - Control (placement accuracy, touch)
   - Comfort (vibration damping, arm-friendliness)
   - Manoeuvrability (swing weight, net play)
   - Value (performance relative to price)

   **Pickleball paddles:**
   - Control (dinking accuracy, touch, soft game)
   - Power (drive speed, put-away ability)
   - Spin (surface texture, spin generation)
   - Feel & Comfort (vibration, handle comfort)
   - Value (performance relative to price)

   **Table tennis tables:**
   - Bounce Quality (consistency, ITTF compliance)
   - Build Quality (frame strength, surface thickness)
   - Portability (folding mechanism, wheels, weight)
   - Durability (weather resistance, surface coating)
   - Value (performance relative to price)

2. Assign weights to criteria (must total 100%).

3. Rate products using a **relative 8.0–9.9 scale**. Since this is a curated "best of" list, every product has already passed a quality bar. The scale works as follows:
   - **Top-rated product -> 9.5–9.9**
   - **Lowest-rated recommended product -> 8.0–8.2**
   - Remaining products are linearly interpolated between these bounds
   - Individual criterion scores should also fall in the 7.5–9.9 range (a criterion score of 7.5 signals a notable weakness)
   - If a product is genuinely poor (low Amazon ratings, quality complaints), **do not include it** rather than giving it a low score

   Base your relative ranking on:
   - Specs and features from PA-API + Playwright
   - Amazon star rating and review count
   - Brand reputation in India (Yonex, Li-Ning, Victor, HEAD, Wilson for racket sports)
   - Price-to-feature ratio
   - "Bought in past month" popularity signal

4. Assign weights to criteria (must total 100%) and calculate weighted overall scores. Verify the weighted average of each product's criterion scores roughly matches its overall rating.

5. Identify:
   - **Top Pick**: Best overall
   - **Best Budget**: Best value under the median price
   - **Best Premium**: Best for those willing to spend more (if applicable)

## Step 3: Create the review data file

Create `src/data/reviews/{{SLUG}}.ts` exporting a `ReviewData` object.

Read `src/types/review.ts` first to understand the exact interface. Key points:

```typescript
import type { ReviewData } from "../../types/review";

const review: ReviewData = {
  meta: {
    title: "{{TITLE}}",
    description: "...", // SEO meta description, 150-160 chars
    sport: "...",  // One of: "tennis" | "badminton" | "pickleball" | "squash"
    level: "...",  // Optional: "Beginner", "Intermediate", "Advanced", etc.
    lastUpdated: "2026-04-25",
    slug: "{{SLUG}}",
  },
  topPick: {
    name: "...",
    tagline: "One-line summary",
    image: "https://m.media-amazon.com/images/I/...", // from PA-API
    rating: 8.5,
    price: "₹X,XXX", // actual price from Playwright (incl. GST)
    buyUrl: "https://www.amazon.in/dp/ASIN?tag=mysweetspot-21",
    highlights: ["highlight 1", "highlight 2", "highlight 3", "highlight 4"],
  },
  intro: [
    "Paragraph 1 about the category...",
    "Paragraph 2 about what to look for...",
  ],
  comparisonProducts: [
    // One entry per product, with specs relevant to this sport/category
    // specs keys become table column headers (pick 3-4 most useful)
    {
      name: "...",
      rating: 8.5,
      price: "₹X,XXX",
      buyUrl: "...",
      badge: "Top Pick", // optional: "Top Pick", "Best Budget", "Best Premium"
      specs: {
        // Badminton: weight, balance, flexibility, level
        // Tennis: head size, weight, string pattern, level
        // Pickleball: weight, core, surface, grip size
        // Table tennis tables: thickness, dimensions, folding, frame
      },
    },
  ],
  ratingCriteria: {
    note: "Based on specs, features, brand trust, and value for Indian players",
    criteria: [
      { label: "Speed", weight: 25, icon: "speed", description: "..." },
      // ... more criteria, weights must total 100
    ],
  },
  products: [
    // Detailed review for each product
    {
      name: "...",
      tagline: "...",
      image: "...", // Primary image URL from PA-API
      images: ["...", "..."], // Variant images from PA-API (if available)
      overallRating: 8.5,
      price: "₹X,XXX",
      buyUrl: "...",
      badge: "Top Pick",
      specs: {
        "Weight": "...",
        "Balance": "...",
        "Flexibility": "...",
        // All relevant specs from Playwright scrape
      },
      pros: ["pro 1", "pro 2", "pro 3"],
      cons: ["con 1", "con 2"],
      ratingBreakdown: [
        { label: "Speed", score: 8.5 },
        // Match the criteria from ratingCriteria
      ],
      reviewText: "2-3 sentence verdict for this product.",
    },
  ],
  buyingGuide: [
    { title: "What to Look For", body: "..." },
    { title: "Budget Considerations", body: "..." },
    // 4-6 sections
  ],
  faq: [
    { q: "...", a: "..." },
    // 5-8 FAQs
  ],
};

export default review;
```

**Important:** The export must be `export default review` — NOT `export const reviewData`. Check the reference file `src/data/reviews/badminton-under-2000.ts` to confirm the pattern.

## Step 4: Create the Astro page

Create `src/pages/reviews/{{SLUG}}.astro`.

Read `src/pages/reviews/best-badminton-rackets-under-2000.astro` first to see the exact pattern. The page should follow this structure:

```astro
---
import ReviewLayout from "../../layouts/ReviewLayout.astro";
import TopPick from "../../components/TopPick.astro";
import ComparisonTable from "../../components/ComparisonTable.astro";
import ProductReview from "../../components/ProductReview.astro";
import RatingMethodology from "../../components/RatingMethodology.astro";
import review from "../../data/reviews/{{SLUG}}";

const tocItems = [
  { id: "top-pick", label: "Our Top Pick" },
  { id: "comparison-table", label: "Quick Comparison" },
  { id: "how-we-rated", label: "How We Rated" },
  ...review.products.map(p => ({
    id: p.name.toLowerCase().replace(/\s+/g, "-"),
    label: p.name,
  })),
  { id: "buying-guide", label: "Buying Guide" },
  { id: "faq", label: "FAQ" },
];
---

<ReviewLayout
  title={review.meta.title}
  description={review.meta.description}
  sport={review.meta.sport}
  level={review.meta.level}
  lastUpdated={review.meta.lastUpdated}
  tocItems={tocItems}
>

  <section class="prose max-w-none">
    {review.intro.map(p => <p>{p}</p>)}
  </section>

  <section id="top-pick" class="scroll-mt-24">
    <h2 class="font-[Barlow_Condensed] text-2xl font-bold text-slate-900 uppercase tracking-wide mb-4">Our Top Pick</h2>
    <TopPick {...review.topPick} />
  </section>

  <section id="comparison-table" class="scroll-mt-24">
    <h2 class="font-[Barlow_Condensed] text-2xl font-bold text-slate-900 uppercase tracking-wide mb-2">Quick Comparison</h2>
    <p class="text-sm text-slate-500 mb-4">Click any racket name to jump to its full review.</p>
    <ComparisonTable products={review.comparisonProducts} />
  </section>

  <RatingMethodology {...review.ratingCriteria} />

  <section class="space-y-8">
    <h2 class="font-[Barlow_Condensed] text-2xl font-bold text-slate-900 uppercase tracking-wide">Detailed Reviews</h2>
    {review.products.map(p => <ProductReview {...p} />)}
  </section>

  <section id="buying-guide" class="scroll-mt-24 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
    <h2 class="font-[Barlow_Condensed] text-2xl font-bold text-slate-900 uppercase tracking-wide mb-5">Buying Guide</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {review.buyingGuide.map(item => (
        <div class="flex gap-3">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section id="faq" class="scroll-mt-24">
    <h2 class="font-[Barlow_Condensed] text-2xl font-bold text-slate-900 uppercase tracking-wide mb-5">Frequently Asked Questions</h2>
    <div class="space-y-4" itemscope itemtype="https://schema.org/FAQPage">
      {review.faq.map(item => (
        <div class="border border-slate-200 rounded-xl overflow-hidden" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <div class="bg-slate-50 px-5 py-3.5">
            <h3 class="font-semibold text-slate-900 text-sm" itemprop="name">{item.q}</h3>
          </div>
          <div class="px-5 py-3.5" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-sm text-slate-600 leading-relaxed" itemprop="text">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

</ReviewLayout>
```

## Writing Guidelines

- Conversational but authoritative tone
- Reference Indian court culture: "your local badminton club", "weekend doubles sessions", "coaching academy practice", "synthetic court surfaces common in India"
- Show prices in INR with the rupee symbol (use incl. GST price from Playwright)
- Compare products honestly — mention real cons
- Include Indian brand context where relevant (e.g., "Yonex dominates Indian badminton from PV Sindhu to your local club", "Li-Ning, the official BWF partner")
- Keep review text concise — 2-3 sentences per product verdict
- For badminton: reference smash speed, net play, doubles vs singles, string tension preferences
- For tennis: reference court surfaces (hard courts dominate in India), arm comfort, power vs control tradeoffs
- For pickleball: reference the growing Indian pickleball scene, indoor vs outdoor play, noise considerations
- For table tennis: reference home use vs club use, space requirements, ITTF compliance

## Critical Rules

- All Amazon URLs MUST use tag=mysweetspot-21
- Do NOT invent specifications — only use data fetched from PA-API or Playwright
- Prices MUST come from Playwright scraping (PA-API often returns no price)
- Image URLs must be real URLs from PA-API (m.media-amazon.com domain)
- Clean up any temporary scripts you create
- Ensure the data file compiles without TypeScript errors
- Make sure `src/data/reviews/` directory exists before writing to it
- Process only the products for THIS roundup ({{SLUG}}), not all roundups
- The export style MUST be `export default review` (not named export)
- The meta field is `sport` (not `category`) — use "tennis", "badminton", "pickleball", or "squash"
- For table tennis tables, use sport: "tennis" (table tennis falls under the tennis umbrella on this site)

## Reference Files

Before writing any code, read these files to understand the exact patterns:

| File | Purpose |
|------|---------|
| `src/types/review.ts` | ReviewData TypeScript interface |
| `src/layouts/ReviewLayout.astro` | Review page layout |
| `src/components/TopPick.astro` | Top pick component |
| `src/components/ComparisonTable.astro` | Comparison table |
| `src/components/ProductReview.astro` | Product review card |
| `src/components/RatingMethodology.astro` | Rating methodology section |
| `src/data/reviews/badminton-under-2000.ts` | Example review data (reference pattern) |
| `src/pages/reviews/best-badminton-rackets-under-2000.astro` | Example review page (reference pattern) |
