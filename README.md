# Midpoint Tech

A production-ready Next.js website for **Midpoint Tech**, a technology-focused business campus at 300 Janadel Avenue, Halfway House, Midrand, Gauteng — part of the wider Midpoint commercial portfolio (`https://www.mid-point.co.za/`).

**Design concept:** "The Meridian Line" — see `docs/design-system.md` for the full rationale and tokens.

> Every property fact, contact detail, and image in this repository is clearly-labelled sample/placeholder data. See `docs/content-required.md` before launch.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4, CSS-variable design tokens
- Framer Motion, React Hook Form + Zod, Lucide icons
- Vitest (unit) + Playwright (e2e)
- Docker (multi-stage, standalone output) + Traefik labels for production routing

## Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose (for containerised deployment)

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
# visit http://localhost:3000
```

## Environment setup

Copy `.env.example` to `.env.local` for development, or provide real environment variables in your deployment platform. See that file for the full list; `src/env.ts` validates them at startup with Zod.

## Development commands

```bash
npm run dev         # start the dev server
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run start         # run the production build locally
```

## Test commands

```bash
npm run test          # Vitest unit tests (schemas, filter logic, utils, analytics sanitisation)
npm run test:watch    # Vitest in watch mode
npm run test:e2e      # Playwright end-to-end tests (starts the app automatically)
```

## Docker commands

```bash
# Local preview, no Traefik required
docker compose -f docker-compose.dev.yml up --build

# Production, behind an existing Traefik instance — see docs/deployment.md
docker network create traefik-public   # first time only
docker compose build
docker compose up -d
docker compose logs -f web
```

## Production build

```bash
npm run build
npm run start
```

The Docker image uses Next.js `output: "standalone"` for a minimal production runtime — see `Dockerfile`.

## Project structure

```
src/app/           Routes, layouts, metadata, server actions, sitemap/robots/OG image
src/components/     ui/ (design-system primitives), sections/, forms/, spaces/
src/content/        Zod schemas + typed sample content (spaces, news, site config)
src/lib/            Utilities: analytics, rate limiting, mail adapter, filtering, formatting
docs/               Full documentation set (see below)
public/media/       Placeholder SVG assets, clearly labelled as sample data
tests/unit/         Vitest tests
tests/e2e/          Playwright tests
```

## Content editing

Content is local, typed TypeScript validated by Zod — no external CMS required to run the site. See `docs/content-management.md` for how to edit spaces, news, and site-wide details, and `docs/asset-register.md` for adding real photography.

## Documentation set

- `docs/research-summary.md` — verified facts vs. assumptions
- `docs/architecture.md` — stack and content-architecture decisions
- `docs/content-required.md` — everything that must be confirmed before launch
- `docs/asset-register.md` — image/asset inventory and requirements
- `docs/design-system.md` — brand tokens, typography, motion, components
- `docs/deployment.md` — exact Docker/Traefik commands
- `docs/content-management.md` — day-to-day editing workflow
- `docs/analytics.md` — event tracking and consent
- `docs/accessibility.md` — WCAG 2.2 AA implementation and manual checklist
- `docs/security.md` — headers, form security, secrets, container hardening
- `docs/launch-checklist.md` — everything to confirm before going live

## Deployment summary

Production deployment is a single Docker container behind an existing Traefik reverse proxy on an external Docker network (`TRAEFIK_NETWORK`, default `traefik-public`). Full step-by-step commands, including rollback and troubleshooting, are in `docs/deployment.md`.

## Troubleshooting

**Docker health check failing** — confirm the container is actually listening on port 3000 and `/api/health` returns `200`; check `docker compose logs web`.

**Traefik 404/502** — see the "Diagnosing common issues" section of `docs/deployment.md`.

**Form submissions not arriving anywhere** — in development this is expected; submissions are logged to the server console only. Set `LEADS_WEBHOOK_URL` for production delivery — see `docs/content-management.md`.
