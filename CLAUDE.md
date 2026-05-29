# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio + blog. Astro 6 + React 19 islands, Tailwind v4, TypeScript (strictest). Package manager is **pnpm**; Node `>=22.12` (`.nvmrc` pins 22).

## Commands

| Command                             | Action                                                                             |
| :---------------------------------- | :--------------------------------------------------------------------------------- |
| `pnpm dev`                          | Dev server at `localhost:4321`                                                     |
| `pnpm build`                        | `astro check` (typecheck — blocks build on errors) then `astro build` to `./dist/` |
| `pnpm check`                        | Typecheck / diagnostics only                                                       |
| `pnpm format` / `pnpm format:check` | Prettier write / verify                                                            |

There is no test runner and no ESLint config — quality gates are `astro check` (types) and Prettier. The `bc3fe9d "fix: correct eslint issues"` commit predates the current setup; do not assume an `eslint` script exists.

After cloning, agent skills are restored from `skills-lock.json` via `npx skills experimental_install` (the `.agents/` and `.claude/` skill folders are gitignored).

## Architecture

### Page composition

`src/pages/index.astro` is the single page. It composes one section per feature folder (`profile`, `info`, `about`, `experience`, `projects`, `stack`, `activity`) inside `src/layouts/Layout.astro`. Each feature folder follows the same shape: a `section.astro` (layout + `SectionTitle` + reveal wrapper) that imports a data/cards child. Add a section by creating the folder, then wiring it into `index.astro` between `trace-hatched` dividers.

`Layout.astro` owns `<head>` (SEO/OG/Twitter meta derived from `data/profile.ts`), the inline no-flash theme script, `SakuraPetals`, `Header`, and the `<slot/>`.

### Two distinct content sources — know which one you're editing

- **`src/data/*.ts`** — typed TS arrays consumed directly by components: `profile.ts`, `experience.ts`, `projects.ts`, `stack.ts`, `nav.ts`. **This is where experience/project/profile content actually lives.** Edit these to change portfolio content.
- **`src/content/` + `src/content.config.ts`** — Astro content collections, for long-form MDX. Two collections exist and **both are rendered**: `about` (via `getEntry('about','main')` + `render()` in `about/section.astro`) and `blog` (MDX posts listed by `src/pages/blog/index.astro` and rendered by `src/pages/blog/[...slug].astro`; slug comes from `entry.id`, per-post OpenGraph image via the optional `image` string field). Drafts (`draft: true`) are hidden in production via an `import.meta.env.PROD` filter.

The governing rule: **structured/relational data → `src/data/*.ts`; long-form prose/MDX → content collections.** (Dead `experiences`/`projects` schemas were removed in the blog change — they were never rendered; that content has always lived in `src/data/`.)

Note `data/experience.ts` stores dates as `YYYY-MM` strings (or the literal `'present'`) and sorts/duration-computes them via `src/lib/experience.ts` — a separate model from the `z.coerce.date()` schema in `content.config.ts`.

### React islands

`.tsx` components (`experience-card`, `project-card`, `expandable-card`, `text-flip`, `button`) are interactive islands hydrated with Astro client directives — `client:visible` is the convention here (see `experience/cards.astro`). Everything else is static `.astro`. shadcn/ui is configured (`components.json`, style `radix-nova`, base `neutral`, `cn()` in `src/lib/utils.ts`); primitives live in `components/ui/`.

### Styling (Tailwind v4 — CSS-first, no `tailwind.config.js`)

All config is in CSS. `src/styles/global.css` is the entry and imports, in order: `theme.css` (design tokens / CSS vars), `utilities.css` (custom `@utility` definitions), `animations.css`. Tailwind v4 idioms in use: `@import 'tailwindcss'`, `@plugin`, `@custom-variant dark (&:is(.dark *))`, and `@utility`. Dark mode is class-based (`.dark` on `<html>`, toggled against `localStorage['theme']`).

The visual language is **blueprint / technical-drawing (CAD)**: the `trace-*` utilities (`trace-h`, `trace-v`, `trace-hatched`, `trace-frame`, `trace-ring`) plus `DimensionLine`, `TraceCorners`, `TraceBrackets` components draw the engineering-drawing aesthetic. Reuse these primitives rather than inventing new dividers/frames.

### Scroll reveal animations

`src/lib/reveal.ts` (imported once in `Layout.astro`) drives all entrance animations via an `IntersectionObserver`. Markup opts in with `data-reveal="<variant>"` (e.g. `fade-up`, `trace-hatched`); the observer sets `data-revealed="true"` to trigger the CSS transition. Per-element timing is tuned with inline CSS vars `--reveal-delay` / `--reveal-duration`. Honors `prefers-reduced-motion` (reveals everything immediately).

## Conventions

- Path alias: `@/*` → `src/*` (tsconfig). Existing files also use relative imports freely — match the neighboring file.
- Prettier: single quotes, semicolons, with `prettier-plugin-astro`, `-tailwindcss` (class sorting), and `-astro-organize-imports`. Run `pnpm format` before committing.
- Conventional commits; this repo's history uses `feat:` / `fix:` / `refactor:`.
- Site copy/UI is English; HTML `lang="es"` and meta descriptions are Spanish (audience is Peru/`es_PE`).
