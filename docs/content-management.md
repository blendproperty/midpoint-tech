# Content management

Content is stored as typed TypeScript/JSON-shaped modules under
`src/lib/content/`, validated by Zod schemas.

## Editing available spaces
File: `src/lib/content/spaces.ts` (schema: `spaces.schema.ts`). Copy an existing
object, update every field, keep `sample: true` until verified, add real images to
`public/images/spaces/` with descriptive alt text, then `npm run typecheck`.

## Editing news/insight articles
File: `src/lib/content/news.ts` (schema: `news.schema.ts`).

## Editing site-wide details
File: `src/lib/content/site.ts` — address, contact, navigation.

## Editing testimonials / tenant categories
File: `src/lib/content/testimonials.ts` — intentionally empty until real,
permissioned quotes exist.

## Migrating to a self-service CMS later
Keep the Zod schemas as the contract; add a fetch layer (MDX or a headless CMS
service) that returns matching shapes. Page components don't need to change.

## Wiring leads to a CRM
`src/lib/email.ts` is an adapter with `log` / `resend` / `smtp` modes via
`EMAIL_PROVIDER`. To integrate a CRM directly, add a call inside `sendLeadEmail` or
a parallel function in the API routes.
