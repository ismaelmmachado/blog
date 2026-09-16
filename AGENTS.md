# Repository Guidelines

## Project Overview

**Purpose**: AI agent tutorial and skills blog similar to superbash.ai. Publishes practical tutorials, model benchmarks, skills directories, and tool reviews. Built as a static/site-generated blog with Node.js/Express backend for API routes and content serving.

**Target Audience**: Developers and AI enthusiasts looking for practical agent tutorials, prompt building, model comparisons, and skill development resources.

**Key Design References**: superbash.ai (Astro v7.2.1, nav layout, hero section, cards grid, footer structure). Core UI patterns: skip-link navigation, container-wrapped grid layouts, hero with CTA, module/card components, nested footer sections.

---

## Architecture & Data Flow

**High-Level Structure**:
- `src/` — All source code (pages, components, layouts, utilities)
- `public/` — Static assets, favicons, robots.txt
- `astro.config.*` — Astro configuration and integrations
- `package.json` — Dependencies and scripts
- `content/` — Content files (markdown posts, tutorials, benchmark data)

**Data Flow**:
1. Content files (`content/*.md`) are sourced by Astro via `contentlayer` or native `getCollection`
2. Pages (`src/pages/`) consume content and render via Astro components
3. Layouts (`src/layouts/`) provide chrome (nav, footer) around page content
4. Components (`src/components/`) — reusable UI: hero, card, table, etc.
5. API routes (`src/pages/api/`) — Express endpoints for search, deals, benchmarks

**Key Modules**:
- `nav/` — Navigation bar with brand, links, search, hub
- `hero/` — Hero section with kicker, title, lede, CTA, stats, art
- `modules/` — Content module grid (lessons, tutorials, instructors)
- `instructor-card/` — Instructor profile cards
- `benchmarks/` — Model benchmark visualizations
- `footer/` — Multi-section footer (base, brand, legal, social, promise)

---

## Key Directories

| Directory | Purpose |
|---|---|
| `src/pages/` | Page entries → `/lessons/`, `/deals/`, `/skills/`, `/videos/`, `/benchmarks/`, `/` |
| `src/layouts/` | Global wrappers: `BaseLayout`, `InstructorCard`, module containers |
| `src/components/` | Reusable UI: `Hero`, `ModuleCard`, `InstructorCard`, `BenchmarksGraphic`, `Nav` |
| `content/` | Markdown content: `lessons/`, `deals/`, `skills/`, `instructors/`, `benchmarks/` |
| `src/styles/` | Global CSS, Astro partials, component-scoped styles |
| `public/` | favicons, robots.txt, manifest, static assets |
| `tests/` | Jest/vitest test suite |

---

## Development Commands

All scripts defined in `package.json`:

| Script | Purpose |
|---|---|
| `dev` | `astro dev` — local development server with hot reload |
| `build` | `astro build` — static site generation |
| `preview` | `astro preview` — preview build locally |
| `astro` | `astro` — CLI for all above + `astro check` |
| `test` | `vitest run` or `jest` — run test suite |
| `test:watch` | `vitest watch` — interactive test development |
| `lint` | `eslint src/` — lint source files |
| `format` | `prettier --write .` — format entire project |

---

## Code Conventions & Common Patterns

**Formatting**: Prettier configured for `.astro`, `.js`, `.md`. Run `pformat` or `npm run format`.

**Naming Conventions**:
- Components: PascalCase (`Hero.astro`, `ModuleCard.astro`)
- Pages: kebab-case matching route (`lessons.astro`, `instructor-card.astro`)
- Utility functions: camelCase, exported from `src/lib/`
- Content markdown: kebab-case titles (`building-your-first-project.md`)
- CSS class BEM-like: `component__element--modifier` (observed in superbash: `hero__title`, `nav__link`, `btn--primary`)

**Error Handling**:
- Astro 404 page at `src/pages/404.astro`
- API routes wrap errors with `try/catch`, return JSON `{ error: "message" }`, status 500
- Content layer errors fall back to "page not found" rather than crashing build

**Async Patterns**:
- All data fetching async/await at page level
- `getStaticProps`/`getServerSideProps` not used — Astro islands architecture
- Components stream HTML, lazy-load non-critical JS

**Dependency Injection**:
- Content layer sources registered in `astro.config.mjs`
- Theme/brand colors defined in one place (`theme-color` meta, CSS vars)
- Nav links generated from `nav` data collection

**State Management**:
- Astro islands: each component manages its own state
- Global state via CSS variables or tiny stores (` zustand` if needed )
- URL params handled via `useParams` or Astro `params` prop

---

## Important Files

| File | Purpose |
|---|---|
| `package.json` | Dependencies, scripts, astro integrations |
| `astro.config.mjs` | Astro config, content layer, integrations (tailwind, react, etc.) |
| `src/pages/index.astro` | Homepage — hero + modules grid |
| `src/pages/lessons.astro` | Lessons listing page |
| `src/pages/deals.astro` | Deals/offers page |
| `src/pages/skills.astro` | Skills directory |
| `src/pages/benchmarks.astro` | Model benchmark charts |
| `src/components/Hero.astro` | Hero section component |
| `src/components/ModuleCard.astro` | Card component for lessons/deals |
| `src/components/InstructorCard.astro` | Instructor profile card |
| `src/lib/content.ts` | Content layer/source queries |
| `src/styles/globals.css` | Global styles, CSS vars, reset |
| `content/lessons/*.md` | Lesson tutorial markdown files |
| `content/benchmarks/*.tsv` | Benchmark data for charts |
| `404.astro` | Custom 404 page |

---

## Runtime/Tooling Preferences

**Required Runtime**: Node.js 18+ (Astro v7+). Astro builds to static HTML + minimal JS.

**Package Manager**: `npm` (or `pnpm`/`bunch` — consistent across team). Lockfile: `package-lock.json`.

**Bundler/Builder**: Astro's built-in esbuild/vite under the hood. No direct Webpack config needed.

**CSS Framework**: Optional Tailwind CSS (superbash.ai uses custom CSS with BEM patterns). If using Tailwind: configure in `astro.config.mjs` with `setupTailwind()`.

**Typography**: Markdown rendered with `astro-contentlayer` or `remark` — ensure headings, code blocks, and tables styled per design.

**Image Optimization**: Astro `<Image />` component for hero images, instructor portraits. WebP/AVIF formats auto-served.

---

## Testing & QA

**Test Framework**: `vitest` (recommended) or `jest`. Configured in `vitest.config.mjs` / `jest.config.js`.

**Test Patterns**:
- Unit tests for utility functions (`src/lib/`)
- Component render tests — mount Astro components, check HTML output
- Page integration tests — visit routes, verify content loads
- Endpoint tests for API routes (`/api/search`, `/api/benchmarks`)

**Running Tests**:
```bash
npm test        # run once
npm run test:watch  # interactive development
```

**Coverage Expectation**: 80%+ for new code. Existing tests may have lower baseline — raise incrementally.

**Visual Regression**: Optional — use `playwright` or `chromatic` if design pixel-perfection is required across viewports.

**QA Checklist Before Commit**:
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] `npm test` passes (or new tests don't decrease coverage)
- [ ] Content markdown parses without errors (`npx astro content:check`)
- [ ] No broken links in navigation or content references

---