# Security

## HTTP headers
Set globally in `next.config.ts`: CSP, X-Content-Type-Options, X-Frame-Options,
Referrer-Policy, Permissions-Policy. HSTS and additional headers applied at the
Traefik layer via compose middleware labels.

## Form security
- Zod validation client- and server-side.
- Honeypot field silently discarded at the API layer (not rejected by the schema,
  so bots aren't tipped off).
- Per-IP sliding-window rate limiting on both form routes.
- No secrets exposed via `NEXT_PUBLIC_*` — email/CRM credentials only in
  server-only modules.
- Honest success/failure states — `ok:true` only returned once delivery is
  confirmed (or logged, in the dev adapter).
- Safe logging — only categorical summary fields logged, not full free-text message
  bodies.

## Environment validation
`src/lib/env.ts` parses `process.env` via Zod at import time and throws immediately
on invalid/missing required values.

## Docker/runtime hardening
Multi-stage build, non-root `nextjs` user, `npm ci` deterministic installs, no dev
dependencies in the runtime image, container `HEALTHCHECK`.

## Uploads
None implemented. If added later: restrict MIME types, enforce size limits, store
outside `/public`, generate filenames server-side.
