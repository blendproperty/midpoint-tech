# Midpoint Tech

Production-ready marketing and leasing website for **Midpoint Tech**, a technology-
focused business destination at 300 Janadel Avenue, Halfway House, Midrand, Gauteng —
a distinct sub-brand within the wider Midpoint commercial property portfolio.

## Overview

The site establishes Midpoint Tech's positioning, showcases available spaces with a
filterable availability experience, and converts visitors via tour-booking and
leasing-enquiry forms. Nearly all property-specific facts (unit sizes, rentals,
infrastructure specification, amenities, tenant names) are **not yet confirmed** and
are represented as clearly labelled sample data — see `docs/content-required.md`
before treating anything here as verified.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · React Hook Form + Zod · Vitest · Playwright · Docker · Traefik.

## Prerequisites

- Node.js 22+
- npm 10+
- Docker + Docker Compose (for containerised runs/deployment)

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:3000`.

## Development commands

```bash
npm run dev         # start the dev server
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint
npm run format      # Prettier (writes)
npm test            # Vitest unit tests
npm run e2e         # Playwright e2e tests (run `npx playwright install` first)
npm run build       # production build
npm start           # start the production build locally
```

## Project structure

```
src/app/            route segments (pages, layouts, API routes)
src/components/      design-system primitives + domain components
src/lib/             content, validation, seo, analytics, email, env, utils
public/              placeholder imagery, floor plans, brand assets
docs/                architecture, design system, deployment, content, security, etc.
tests/unit/          Vitest suites
tests/e2e/           Playwright suites
```

## Editing content

Content is typed, Zod-validated TypeScript under `src/lib/content/` — no CMS login
required. See `docs/content-management.md` for exactly which files to edit, and
`docs/architecture.md` for why this approach was chosen over a hosted CMS.

## Docker

```bash
docker compose -f docker-compose.dev.yml up --build   # local, no Traefik, exposes :3000
docker compose up -d --build                           # production, behind Traefik
```

Full deployment instructions are in `docs/deployment.md`.

## Documentation index

- `docs/research-summary.md` — verified facts vs. positioning recommendations vs.
  unconfirmed information
- `docs/architecture.md` — technical/content architecture rationale
- `docs/content-required.md` — outstanding property data and confirmations
- `docs/asset-register.md` — every image/asset needed, dimensions, status
- `docs/design-system.md` — tokens, typography, motion, components
- `docs/deployment.md` — Docker + Traefik deployment runbook
- `docs/content-management.md` — how to edit content
- `docs/analytics.md` — event tracking and privacy approach
- `docs/accessibility.md` — WCAG 2.2 AA implementation + manual checklist
- `docs/security.md` — headers, form security, secrets handling
- `docs/launch-checklist.md` — what remains before public launch

## Troubleshooting

- **Build fails fetching fonts**: shouldn't happen — fonts are self-hosted. If you
  see a `next/font/google` error, check no code has reintroduced a Google-fetched
  font.
- **Form submissions "succeed" but no email arrives**: confirm `EMAIL_PROVIDER` is
  `resend` (with `RESEND_API_KEY`) or a completed `smtp` implementation — the
  default `log` provider only logs to stdout.
- **Docker container unhealthy**: check `docker compose logs web` —
  `src/lib/env.ts` throws on invalid/missing required environment variables.
- **Traefik 404/502/TLS issues**: see the diagnosis section at the end of
  `docs/deployment.md`.

## Known limitations at time of this build

- Playwright browser binaries and a Docker daemon were not available in the sandbox
  used to build this project, so the e2e suite and `docker build` could not be
  executed here (though the app was fully verified via `tsc`, ESLint, Vitest, and
  `next build`, and the Dockerfile/compose files were carefully reviewed). Run
  `npx playwright install` and `docker build .` in a normal environment before
  relying on those results.
- All property, infrastructure, amenity and tenant content is sample data pending
  confirmation — see `docs/content-required.md`.
