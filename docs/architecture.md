# Architecture

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict mode)
- Tailwind CSS v4 (CSS-variable-driven theme in `src/app/globals.css`)
- Framer Motion for the limited, deliberate motion used on the site
- React Hook Form + Zod for all form validation (client and server)
- Lucide for icons

## Content architecture — Option A (chosen)

The brief offered two options: local typed content (MDX/TS/JSON + Zod), or a lightweight headless CMS in Docker. This project uses **Option A: local typed TypeScript content validated by Zod schemas** (`src/content/`), for these reasons:

- **Zero additional moving parts.** No extra database, admin UI, or container to operate, patch or back up — important for a small marketing/leasing site that a small team needs to keep running reliably.
- **Type safety end-to-end.** Every space and article is parsed through `spaceSchema` / `newsArticleSchema` at build/runtime, so a malformed content edit fails loudly instead of shipping a broken page.
- **Good-enough editing experience.** Content changes are plain TypeScript objects in `src/content/spaces.ts` and `src/content/news.ts` — readable by a non-engineer with light guidance, and diffable in version control (useful for a regulated leasing/marketing context).
- **Easy upgrade path.** Because all data already flows through Zod schemas, swapping the data source for a headless CMS (or a database) later only means changing how `spaces`/`newsArticles` arrays are populated — the schema and every component that consumes them stay the same.

The trade-off: a non-technical team member cannot edit content through a web UI today. See `docs/content-management.md` for the recommended near-term editing workflow and a documented path to a CMS if that becomes a priority.

## Directory structure

```
src/
  app/                 App Router routes, layouts, metadata, actions
    actions/leads.ts   Server actions for all three lead forms
    api/health/        Docker health-check endpoint
    spaces/[slug]/     Individual space pages
    news/[slug]/       Individual article pages
  components/
    ui/                Design-system primitives (Button, Section, Gallery, ...)
    sections/          Page-level composed sections (Hero, Nav, Footer, ...)
    forms/             Tour / leasing / general enquiry forms
    spaces/            Spaces explorer (filtering, grid/list, drawer)
  content/             Zod schemas + typed sample content (spaces, news, site config)
  lib/                 Utilities: analytics, rate limiting, mail adapter, formatting
docs/                  This documentation set
public/media/          Placeholder SVG assets, clearly labelled as sample data
```

## Rendering strategy

- Marketing pages (home, about, experience, location, community, legal) are static Server Components.
- `/spaces` and `/news` listing pages are static; individual space/article pages use `generateStaticParams` for SSG.
- The spaces explorer's filter UI (`SpacesExplorer`) is a client component that reads/writes URL search params, so filtered views are shareable and bookmarkable without a server round-trip.
- Forms are client components that call Next.js **server actions** (`src/app/actions/leads.ts`) directly — this keeps validation logic on the server (never trust the client) while still getting React Hook Form's client-side UX.

## Environment variables

All environment variables are validated at startup via `src/env.ts` (Zod). See `.env.example` for the full list and `docs/deployment.md` for how they map to Docker/Traefik.
