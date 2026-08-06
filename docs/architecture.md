# Architecture

## Stack
Next.js 16 (App Router, React 19, TypeScript strict), Tailwind CSS v4, Framer
Motion, React Hook Form + Zod, Vitest, Playwright, ESLint + Prettier.

## Content architecture: typed local content, not a hosted CMS

Content is implemented as local, Zod-validated TypeScript modules under
`src/lib/content/`, paired with `*.schema.ts` files.

Chosen over a hosted/paid headless CMS because:
- Zero additional operational surface (no extra DB, admin UI, or service).
- Type safety end-to-end — malformed content fails the build.
- Cheap to evolve later — migrating to a headless CMS mainly means writing a fetch
  layer returning the same shapes.
- No paid dependency required to run the project.

See `docs/content-management.md` for exactly which files to edit.

## Rendering strategy
- Marketing pages are static (RSC, no client data fetching).
- `/spaces` reads `searchParams` server-side to filter/sort.
- `/spaces/[slug]` and `/news/[slug]` use `generateStaticParams`.
- API routes (`/api/forms/tour`, `/api/forms/leasing`, `/api/health`) are the only
  dynamic server logic.

## Why self-hosted fonts instead of `next/font/google`
`next/font/google` fetches font files at build time. In network-restricted build
environments that fetch can fail. This project self-hosts Space Grotesk and Inter
variable fonts via `next/font/local` instead, sourced directly from the
`@fontsource-variable/*` npm packages rather than vendored binary copies — this
avoids any runtime dependency on fonts.googleapis.com while keeping the repository
free of committed binary font files.
