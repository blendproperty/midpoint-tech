# Launch checklist

## Content & assets
- [ ] Replace every item in `docs/content-required.md`.
- [ ] Replace every placeholder image/floor plan.
- [ ] Legal review of `/privacy`, `/terms`, `/paia`.
- [ ] Confirm dedicated Midpoint Tech phone/email in `src/lib/content/site.ts`.

## Configuration
- [ ] Set `NEXT_PUBLIC_SITE_URL` / `SITE_URL` to the real production domain.
- [ ] Set `EMAIL_PROVIDER` to `resend` or implemented `smtp`; test a submission.
- [ ] Set `APP_DOMAIN`, `TRAEFIK_NETWORK`, `LETSENCRYPT_RESOLVER` for the VPS.

## Technical verification (run before every release)
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run e2e` (requires `npx playwright install` first)
- [ ] Lighthouse pass (mobile) on `/`, `/spaces`, a space detail page, `/contact`.
- [ ] Manual accessibility pass per `docs/accessibility.md`.
- [ ] `docker compose up -d --build` on the target VPS, confirm `/api/health`.

## SEO
- [ ] Verify Google Search Console for the production domain.
- [ ] Spot-check metadata on every route.
- [ ] Validate structured data with Google's Rich Results Test.

## Post-launch
- [ ] Monitor first week of form submissions for delivery failures.
- [ ] Confirm no residual "sample data" badges remain visible once real content is live.
