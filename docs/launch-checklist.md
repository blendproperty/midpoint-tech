# Launch checklist

## Content (see docs/content-required.md for full detail)

- [ ] Replace all sample space data with verified units, sizes, rentals, specs and availability dates
- [ ] Replace all placeholder SVG imagery with licensed property photography
- [ ] Replace placeholder floor plans and add real brochures
- [ ] Replace sample contact details (phone, email) with live leasing-team details
- [ ] Confirm and update exact GPS coordinates for the location page and structured data
- [ ] Replace placeholder news articles with real, fact-checked content
- [ ] Add tenant logos/stories only once written authorisation exists

## Legal

- [ ] Qualified legal review of `/privacy`, `/terms`, `/paia` (POPIA compliance)
- [ ] Confirm PAIA information officer contact details
- [ ] Confirm consent-banner copy and cookie policy

## Analytics

- [ ] Confirm GTM container ID and wire up loader in `layout.tsx`
- [ ] Build a real, accessible cookie-consent banner wired to `mt-analytics-consent`
- [ ] Verify GA4 events fire correctly through GTM in a staging environment
- [ ] Confirm no personal data reaches analytics (spot-check network requests)

## Forms / leads

- [ ] Set `LEADS_WEBHOOK_URL` to the real CRM/webhook endpoint
- [ ] Send test submissions through all three forms (tour, leasing, general) and confirm delivery
- [ ] Confirm rate limiting behaviour is acceptable for expected traffic; move to a shared store if deploying multiple replicas

## Accessibility

- [ ] Complete the manual checklist in `docs/accessibility.md`
- [ ] Run an automated audit (axe/Lighthouse) against the production build

## Performance

- [ ] Run Lighthouse against production build on representative pages; confirm 90+ performance score
- [ ] Confirm LCP media (hero) is optimised once real imagery replaces placeholders
- [ ] Confirm no console errors/warnings in production build

## SEO

- [ ] Verify `NEXT_PUBLIC_SITE_URL` is set correctly in production (affects canonical URLs, sitemap, OG tags)
- [ ] Submit sitemap to Google Search Console after DNS cutover
- [ ] Spot-check structured data with Google's Rich Results Test

## Infrastructure

- [ ] Confirm `APP_DOMAIN`, `TRAEFIK_NETWORK`, `LETSENCRYPT_RESOLVER` match the target environment
- [ ] Confirm TLS certificate issues successfully post-DNS-cutover
- [ ] Confirm `/api/health` responds correctly in production
- [ ] Run `npm audit` and address any high/critical findings

## Testing

- [ ] Run `npm run test` (unit) and `npm run test:e2e` (Playwright) and fix any failures
- [ ] Manually test on real mobile devices (not just responsive dev tools) at 320–430px widths

## Assumptions made during this build (review before launch)

- All property data, contact details, and coordinates are placeholder/sample and require replacement (see `docs/content-required.md`)
- No tenant, funding, or partnership claims have been made anywhere in the copy — confirm this restraint is still correct once real programmes exist
- The consent-gating mechanism for analytics is a functional placeholder, not a full CMP
