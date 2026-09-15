# LaunchGraph

An evidence-driven exploration of how high-distribution technology launches are framed across Social Capital Inc.’s public selected work.

---

## Problem

Modern technology product launches increasingly rely on social distribution channels rather than traditional press releases. However, public analysis of high-impact launch campaigns often relies on fragmented anecdotes rather than structured empirical observation. Without a standardized evidence model, teams cannot systematically evaluate how leading technology companies structure their narrative hooks, credibility proof points, and creator-led anchor assets.

---

## Research Question

> *How are primary launch anchor posts structured across founder participation, financial/institutional proof, and narrative hooks in high-distribution technology campaigns?*

---

## What the Tool Does

LaunchGraph is an open research prototype that catalogs, categorizes, and analyzes publicly observable product launch anchor posts across nine technology case studies published by Social Capital Inc. The application provides:

- An interactive **Launch Table** with multi-dimensional client-side filtering.
- A **Selected-Work Timeline** mapping release sequences from February 2025 to March 2026.
- A visual **Evidence Matrix** tracking presence/absence of key framing signals.
- **Statistical visualizations** illustrating signal prevalence and opening narrative taxonomies.
- Dedicated **Static Detail Pages** for each verified case study.



## Key Finding

- **8 of 9 (89%)** featured anchor posts in the public selected-work portfolio are published directly from individual founder accounts.
- **7 of those 8 (88%)** founder-led announcements explicitly incorporate funding amounts, named institutional investors, or strategic backing proof directly within the launch post.
- **Observed Pattern:** High-distribution technology launches frequently unite personal founder distribution with institutional validation, framing the announcement around category creation, operating scale, or founder conviction rather than isolated company news.
- *Caveat:* This is an external portfolio observation based on public case studies, not a statement regarding internal agency guidelines or universal campaign mandates.

---

## Dataset & Provenance

The dataset comprises **nine publicly listed case studies** retrieved from Social Capital Inc.’s public [Selected Work](https://www.sociallcapital.com/work) page.

| Company | Month | Featured Account | Type | Platform | Opening Narrative Taxonomy | Video | Funding Proof |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **PlayerZero** | Mar 2026 | Animesh Koratana (`@akoratana`) | Founder | X | Product + funding | Yes | Yes |
| **Wispr Flow** | Feb 2026 | Tanay Kothari (`@tankots`) | Founder | X & LinkedIn | Challenge hook | Yes | No |
| **PolyAI** | Feb 2026 | PolyAI (`@polyaivoice`) | Company | X | Funding + scale | Yes | Yes |
| **Airwallex** | Dec 2025 | Jack Zhang (`@awxjack`) | Founder | X & LinkedIn | Founder story | No | Yes |
| **Gamma** | Nov 2025 | Grant Lee (`@thisisgrantlee`) | Founder | X & LinkedIn | Funding + milestone | Yes | Yes |
| **Cartesia** | Oct 2025 | Karan Goel (`@krandiash`) | Founder | X & LinkedIn | Product + funding | Yes | Yes |
| **Deel** | Oct 2025 | Alex Bouaziz (`@Bouazizalex`) | Founder | X & LinkedIn | Founder story | No | Yes |
| **Superblocks** | May 2025 | Brad Menezes (`@bradmenezes`) | Founder | X | Product + funding | Yes | Yes |
| **Icon** | Feb 2025 | Kennan Frost (`@kennandavison`) | Founder | X & LinkedIn | Product + backing | Yes | Yes |

* **Every record** includes direct source links to the original public case study.
* **Dataset Last Reviewed Date:** `2026-09-15` (configured in `src/data/launches.js`).

---

## Evidence Model

LaunchGraph maintains a strict boundary between observable primary facts and structured analytical classifications:

1. **Primary Source Facts:**
   - Publication month & date
   - Displayed time (with explicit notation that timezones are unspecified by the source)
   - Featured author name and handle
   - Platform destination (X, LinkedIn)
   - Presence of native video asset
2. **Structured Manual Classifications:**
   - Opening type taxonomy (*Product + funding*, *Challenge hook*, *Funding + scale*, *Founder story*, *Funding + milestone*, *Product + backing*)
   - Credibility signals (*Series B, $100M ARR, named tier-1 backers, category positioning*)
   - Classification rationale and analytical context

---

## Features

- **Emerging Launch Architecture Panel:** Dynamically computed narrative synthesis linking quantitative observations to qualitative evidence.
- **Signal Prevalence Bar Chart:** Horizontal distribution chart quantifying founder distribution, funding proof, video usage, and origin stories across all 9 case studies.
- **Opening Taxonomy Chart:** Visual breakdown of narrative opening frameworks.
- **Evidence Matrix:** Per-case tabular matrix with accessible indicators and direct source links.
- **Responsive Multi-Filter Table:** Client-side filtering by account type, platform, and opening narrative hook.
- **Comprehensive Methodology Page:** Full transparency on research governance, data provenance, and analytical boundaries.

---

## Technical Architecture

- **Framework:** Next.js (App Router)
- **Language:** JavaScript (ES6+ / React 19)
- **Styling:** Vanilla CSS & Tailwind CSS v4 with curated design tokens (off-white `#fbfbfb`, dark charcoal `#1a1a1a`, deep-red `#991b1b`)
- **Charts:** Recharts (responsive client-rendered SVG visualizations)
- **Icons:** Lucide React
- **Data Architecture:** Local structured JavaScript dataset (`src/data/launches.js`)
- **Analytics Engine:** Pure JavaScript calculation functions (`src/lib/analytics.js`)
- **Rendering Strategy:** Static Site Generation (SSG) with `generateStaticParams` for all detail routes

---

## Why Deterministic Analysis?

An LLM runtime was deliberately **not** added to the web application runtime. The rationale:

1. **Small & Structured Dataset:** With nine verified records, deterministic computations ensure 100% mathematical accuracy and reproducible counts.
2. **Zero Hallucination:** Eliminates probabilistic variations, ensuring that every displayed percentage, counter, and signal map is directly auditable.
3. **No Unsupported Claims:** Prevents automated generation of unverified statements about private agency operations or conversion results.
4. **Agentic Development Workflow:** AI coding assistants were leveraged during development for rapid code generation, while research classifications and domain logic remained source-bound and manually reviewed.

---

## Limitations

- **Anchor Assets Only:** Analyzes initial anchor posts; does not catalog downstream quote-tweet waves, creator syndication networks, or affiliate amplification.
- **No Conversion Metrics:** Public engagement signals do not represent commercial conversions, revenue, or campaign ROI.
- **Non-Exhaustive Scope:** Reflects only the case studies publicly featured on Social Capital’s Selected Work page at the time of review.
- **Timezone Ambiguity:** Displayed timestamps on source case study pages omit timezone data; times are recorded verbatim without timezone assumptions.

---

## Running Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm (or compatible package manager)

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000

# 4. Run ESLint checks
npm run lint

# 5. Build production bundle and generate static pages
npm run build
```

> **Dataset last reviewed:** `2026-09-15` — configured via `DATASET_LAST_REVIEWED` in `src/data/launches.js` and displayed in the site footer and Methodology page.


## Future Improvements

- **Creator Amplification Mapping:** Catalog secondary reposts, creator commentary waves, and community discussions surrounding anchor launches.
- **Cross-Platform Timestamp Normalization:** Correlate UTC timestamps across native platform APIs where public metadata permits.
- **Historical Engagement Snapshots:** Incorporate point-in-time public view and repost counters.
- **Portfolio Expansion:** Add new public case studies as they are published to the public record.
- **Source-Grounded Semantic Search:** Implement optional client-side semantic query matching over verified post transcripts and credibility tags.

---

## Responsible-Use Statement

- **Public Data Only:** All data points originate from publicly accessible web pages and social media posts.
- **No Private Data:** No confidential client contracts, conversion logs, internal briefings, or private campaign data were accessed or used.
- **No Presumption of Commission:** Mention of an account or post does not imply agency engagement beyond what is explicitly published on public case-study pages.
- **No ROI Claims:** Public view or like counts are not equated with enterprise revenue or conversion efficacy.
- **Ethical Collection:** No unauthorized web scraping or rate-limit evasion was conducted in the creation of this prototype.
