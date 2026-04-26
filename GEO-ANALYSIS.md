# GEO Analysis: mysweetspot.in

**Date:** April 26, 2026
**URL:** https://www.mysweetspot.in/
**Site Type:** Affiliate review site (racket sports, India-focused)
**Framework:** Astro 6 + Vercel (static site generation)
**Pages indexed:** 25

---

## GEO Readiness Score: 52/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Citability | 14/25 | 25% | 14 |
| Structural Readability | 16/20 | 20% | 16 |
| Multi-Modal Content | 6/15 | 15% | 6 |
| Authority & Brand Signals | 5/20 | 20% | 5 |
| Technical Accessibility | 11/20 | 20% | 11 |
| **Total** | | | **52/100** |

---

## Platform Breakdown

| Platform | Estimated Visibility | Reasoning |
|----------|---------------------|-----------|
| **Google AI Overviews** | Medium (55/100) | Good schema, FAQ markup, and structured content. Needs traditional SEO ranking signals (backlinks, domain authority) to enter top-10 where 92% of AIO citations come from. |
| **ChatGPT** | Low (25/100) | No Wikipedia entity, no Reddit presence, no LinkedIn brand page. ChatGPT relies heavily on Wikipedia (47.9%) and Reddit (11.3%) for citations. |
| **Perplexity** | Low (30/100) | No Reddit discussions or community validation. Perplexity sources 46.7% from Reddit. Some structured content helps. |
| **Bing Copilot** | Low-Medium (40/100) | All crawlers allowed. No IndexNow implementation detected. |

---

## AI Crawler Access Status

| Crawler | Status |
|---------|--------|
| GPTBot (OpenAI) | **Allowed** (no restriction) |
| OAI-SearchBot (OpenAI) | **Allowed** (no restriction) |
| ChatGPT-User (OpenAI) | **Allowed** (no restriction) |
| ClaudeBot (Anthropic) | **Allowed** (no restriction) |
| PerplexityBot | **Allowed** (no restriction) |
| CCBot (Common Crawl) | **Allowed** (no restriction) |
| anthropic-ai | **Allowed** (no restriction) |
| Bytespider (ByteDance) | **Allowed** (no restriction) |

**robots.txt:** Permissive (`User-agent: * / Allow: /`). All AI crawlers can access the site. Consider explicitly blocking training-only crawlers (CCBot, Bytespider) while keeping search crawlers allowed.

---

## llms.txt Status

**Not found** (HTTP 404 at `/llms.txt`).

### Recommended llms.txt

```
# MySweetSpot
> India's independent racket sport review site. We test every racket on court and publish honest reviews with real specs, prices, and pros/cons. No sponsored content.

## Reviews
- [Best Tennis Rackets Under 5000](https://mysweetspot.in/reviews/best-tennis-rackets-under-5000-india/): HEAD and Wilson rackets compared for recreational players
- [Best Tennis Rackets Under 10000](https://mysweetspot.in/reviews/best-tennis-rackets-under-10000-india/): Mid-range tennis rackets for improving players
- [Best Tennis Rackets Under 20000](https://mysweetspot.in/reviews/best-tennis-rackets-under-20000-india/): Advanced tennis rackets with carbon fibre frames
- [Best Badminton Rackets Under 2000](https://mysweetspot.in/reviews/best-badminton-rackets-under-2000-india/): Budget badminton rackets for beginners
- [Best Badminton Rackets Under 5000](https://mysweetspot.in/reviews/best-badminton-rackets-under-5000-india/): Yonex, Li-Ning, and Victor rackets compared
- [Best Pickleball Paddles Under 2500](https://mysweetspot.in/reviews/best-pickleball-paddles-under-2500-india/): Entry-level pickleball paddles
- [Best Pickleball Paddles Under 5000](https://mysweetspot.in/reviews/best-pickleball-paddles-under-5000-india/): Mid-range pickleball paddles
- [Best Pickleball Paddles Under 10000](https://mysweetspot.in/reviews/best-pickleball-paddles-under-10000-india/): Premium pickleball paddles
- [Best Squash Rackets Under 3000](https://mysweetspot.in/reviews/best-squash-rackets-under-3000-india/): Budget squash rackets
- [Best Squash Rackets Under 10000](https://mysweetspot.in/reviews/best-squash-rackets-under-10000-india/): Intermediate squash rackets
- [Best Table Tennis Tables](https://mysweetspot.in/reviews/best-table-tennis-tables-india/): Indoor and outdoor tables compared

## About
- [Methodology](https://mysweetspot.in/methodology/): How we test — 6+ hours per racket, no free products
- [About](https://mysweetspot.in/about/): Our mission and independence pledge
- [Affiliate Disclosure](https://mysweetspot.in/disclosure/): Amazon.in and Flipkart affiliate partnerships

## Key Facts
- Based in India, all prices in INR
- 11 roundup reviews covering 5 racket sports
- No sponsored content or manufacturer-provided products
- 10-point rating system with transparent criteria
```

---

## Brand Mention Analysis

| Platform | Present? | Impact |
|----------|----------|--------|
| Wikipedia | No | **Critical gap.** Wikipedia is the #1 citation source for ChatGPT (47.9%). |
| Reddit | No | **Critical gap.** Reddit is #1 for Perplexity (46.7%) and #2 for ChatGPT (11.3%). |
| YouTube | No | **Major gap.** YouTube mentions have the strongest correlation (0.737) with AI citations. |
| LinkedIn | No | **Moderate gap.** LinkedIn presence supports brand entity recognition. |
| Wikidata | No | No structured entity data for AI models. |

**Brand mention score: 0/5 platforms.** This is the single biggest weakness for AI search visibility.

---

## Passage-Level Citability Analysis

### Strengths
- FAQ sections provide question-answer pairs in citable format
- Product verdicts are self-contained summaries
- Comparison tables provide structured, extractable data
- Specific prices in INR with product names
- Publication dates present on reviews

### Weaknesses
- **FAQ answers are too short** (~58-75 words). Optimal is 134-167 words for AI citation.
- **No "What is..." definition blocks** in the opening content (e.g., "What are the best tennis rackets under 5000 in India?")
- **Statistics lack formal attribution** — Amazon review counts referenced but not properly sourced
- **No expert quotes** or attributed opinions
- **Opening paragraphs** are good context-setters but don't contain a direct answer in the first 40-60 words

### Sample Citability Issues

**Current opening (tennis review):**
> "Under ₹5000 is where most recreational tennis players in India start..."

**Optimized for citability:**
> "The best tennis racket under ₹5000 in India is the HEAD Titanium Tour Pro (₹3,237), which scored 9.5/10 in our hands-on testing for its lightweight 275g frame and oversized 112 sq in head. Under ₹5000 is where most recreational tennis players in India start..."

---

## Server-Side Rendering Check

**Status: Excellent**

- **Framework:** Astro 6 (static site generation by default)
- **Deployment:** Vercel with `@astrojs/vercel` adapter
- **SSR Assessment:** Astro generates static HTML at build time. All content is available without JavaScript execution.
- **AI crawlers can access:** All text content, structured data, meta tags, and schema markup without needing JavaScript.

This is one of the site's strongest GEO signals.

---

## Top 5 Highest-Impact Changes

### 1. Build Brand Presence on Reddit, YouTube, and LinkedIn (Impact: +15-20 points)
Brand mentions correlate 3x more with AI visibility than backlinks. Currently at 0/5 platforms.
- **Reddit:** Participate in r/tennis, r/badminton, r/Pickleball, r/india with genuine expertise. Share testing insights (not links).
- **YouTube:** Create short-form racket comparison videos. Even 2-3 minute review summaries significantly boost entity recognition.
- **LinkedIn:** Create a company page and founder profile with racket sports expertise.

### 2. Create `/llms.txt` File (Impact: +5 points, 10 minutes of work)
Use the template above. This directly tells AI crawlers what your site offers and which pages matter most.

### 3. Expand FAQ Answers to 134-167 Words Each (Impact: +8 points)
Current FAQ answers are 58-75 words — below the optimal citation length. Each answer should be a self-contained, citable passage with specific product names, prices, and reasoning.

### 4. Add "Direct Answer" Opening to Every Review (Impact: +5 points)
Start each review with a direct answer in the first 40-60 words:
> "The best [category] in India is the [Product Name] at [Price], which scored [Rating]/10 in our testing for [key reason]."

### 5. Add Author Bylines with Credentials (Impact: +5 points)
- Add individual author names to reviews (not just "MySweetSpot")
- Include playing experience, years in sport, certifications
- Implement `Person` schema with `sameAs` links to social profiles
- This directly improves E-E-A-T signals for both traditional and AI search

---

## Schema Recommendations

### Currently Present (Good)
- Organization
- WebSite
- Article (with datePublished, dateModified)
- BreadcrumbList
- FAQPage
- ItemList
- Product with AggregateRating

### Missing (Add These)

**Person Schema (for authors):**
```json
{
  "@type": "Person",
  "name": "Author Name",
  "jobTitle": "Racket Sports Reviewer",
  "sameAs": [
    "https://linkedin.com/in/author",
    "https://youtube.com/@author"
  ]
}
```

**Review Schema (explicit):**
```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Author Name" },
  "reviewRating": { "@type": "Rating", "ratingValue": "9.5", "bestRating": "10" },
  "itemReviewed": { "@type": "Product", "name": "HEAD Titanium Tour Pro" }
}
```

**SpeakableSpecification (for voice/AI assistants):**
```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".top-pick", ".faq-answer"]
  }
}
```

---

## Content Reformatting Suggestions

### 1. Add Definition Blocks to Category Pages
Each sport category page (tennis, badminton, etc.) should open with:
> "Tennis rackets in India range from ₹1,500 for aluminium beginners to ₹25,000+ for professional carbon fibre frames. MySweetSpot has tested [X] rackets across [Y] price brackets to help Indian players find the right racket for their level and budget."

### 2. Expand Buying Guide Sections
Current buying guides use short paragraphs. Restructure each buying factor as:
- **Question heading** ("What head size should I choose?")
- **134-167 word answer** with specific recommendations
- **Table** with size ranges and skill levels

### 3. Add "Bottom Line" Blocks
After each product review, add a highlighted 134-167 word "Bottom Line" block that stands alone as a complete recommendation. This is the passage AI models will most likely cite.

### 4. Cross-Reference Between Reviews
Add comparison callouts: "Compared to the [Product] in our [Other Review], this racket offers..." This builds internal entity relationships that AI models can follow.

### 5. Add Source Attribution to Statistics
Change: "4.5-star rating across 464 reviews"
To: "4.5-star rating across 464 verified buyer reviews on Amazon.in (as of April 2026)"

---

## Additional Recommendations

### Sitemap
- `/sitemap.xml` returns 404 — the sitemap is at `/sitemap-index.xml` → `/sitemap-0.xml`
- Consider adding a redirect from `/sitemap.xml` to `/sitemap-index.xml` for discoverability
- robots.txt correctly references `https://mysweetspot.in/sitemap-index.xml`

### IndexNow
- Not detected. Implement IndexNow for faster Bing/Yandex indexing
- Bing Copilot draws from Bing's index, so faster indexing = faster AI visibility

### Training Crawler Control
Consider updating robots.txt to explicitly manage training vs. search crawlers:
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: *
Allow: /
```

---

## Priority Roadmap

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Create `/llms.txt` | 10 min | Medium |
| P0 | Add direct-answer openings to all 11 reviews | 2-3 hrs | High |
| P0 | Expand FAQ answers to 134-167 words | 3-4 hrs | High |
| P1 | Add author bylines + Person schema | 1-2 hrs | Medium-High |
| P1 | Create Reddit presence (r/tennis, r/badminton, etc.) | Ongoing | Very High |
| P1 | Create YouTube channel with review summaries | Ongoing | Very High |
| P2 | Create LinkedIn company page | 30 min | Medium |
| P2 | Implement IndexNow | 1 hr | Medium |
| P2 | Add SpeakableSpecification schema | 30 min | Low-Medium |
| P2 | Update robots.txt for training crawlers | 10 min | Low |
| P3 | Build Wikipedia presence (if notable) | Weeks-Months | Very High |
| P3 | Create original research/surveys | Days | High |
