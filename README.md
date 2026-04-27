# portfolio-ssj2

Personal portfolio and blog. Built with Astro, React, Tailwind v4 and TypeScript.

## Commands

All commands are run from the root of the project:

| Command             | Action                                     |
| :------------------ | :----------------------------------------- |
| `pnpm install`      | Install dependencies                       |
| `pnpm dev`          | Start local dev server at `localhost:4321` |
| `pnpm build`        | Build production site to `./dist/`         |
| `pnpm preview`      | Preview the production build locally       |
| `pnpm check`        | Run `astro check` (type + diagnostics)     |
| `pnpm format`       | Format all files with Prettier             |
| `pnpm format:check` | Check formatting without writing           |

## Restoring Claude Code skills

This repo uses Claude Code agent skills pinned in `skills-lock.json`. The skill
source folders (`.agents/` and `.claude/`) are gitignored — only the lockfile
travels with the repo. To install them after cloning:

```sh
npx skills experimental_install
```

## Project structure

```text
src/
├── components/
│   ├── ui/        shadcn primitives
│   ├── layout/    Header, SakuraPetals, ThemeToggle
│   ├── profile/   profile card blocks
│   └── blog/      blog-specific components
├── content/blog/  MDX posts
├── data/          typed site config (site.ts, nav.ts)
├── layouts/       page wrappers
├── lib/           helpers
├── pages/         file-based routing
└── styles/        global.css
```
