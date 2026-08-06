# Content management

Midpoint Tech uses local, typed TypeScript content validated by Zod (see `docs/architecture.md` for why). This document explains how to edit it day to day.

## Editing a space

Open `src/content/spaces.ts`. Each entry is a plain object matching `spaceSchema` (`src/content/schema.ts`). To edit an existing space, change its fields directly. To add a new one, copy an existing object, give it a unique `slug`, and fill in every required field — TypeScript and Zod will both flag anything missing or malformed when you run `npm run build`.

Once every field on a space is confirmed real data (not a placeholder), set `isSample: false` — this removes any "sample" labelling shown in the UI.

## Editing news/insights

Same pattern in `src/content/news.ts`, matching `newsArticleSchema`. `body` is an array of paragraph strings.

## Editing site-wide details

Contact details, address, navigation links and calls to action live in `src/content/site.ts`.

## Adding real photography

See `docs/asset-register.md` for the full checklist. In short: drop optimised images into `public/media/<section>/`, then update the relevant `gallery`/`cover`/`floorPlan` fields with real `src` and descriptive `alt` text.

## Connecting leads to a CRM

By default (development), submitted forms are logged server-side only (`LogMailAdapter` in `src/lib/mail/adapter.ts`) — nothing is sent anywhere, and personal fields are redacted from the log line.

In production, set `LEADS_WEBHOOK_URL` to an inbound webhook URL (most CRMs — HubSpot, Pipedrive, a Zapier/Make catch hook, or a custom endpoint — can provide one). `EmailMailAdapter` POSTs a JSON payload shaped like:

```json
{
  "formType": "tour",
  "fields": { "fullName": "...", "workEmail": "...", "...": "..." },
  "sourcePage": "/spaces/block-a-suite-201",
  "submittedAt": "2026-08-06T10:00:00.000Z"
}
```

To integrate a specific CRM's native API instead of a generic webhook, replace the body of `EmailMailAdapter.send()` in `src/lib/mail/adapter.ts` — the rest of the form/action pipeline does not need to change.

## Upgrading to a headless CMS later

Because every page reads from `spaces` / `newsArticles` exported by `src/content/*.ts`, migrating to a CMS later means replacing those two files' data source (e.g. fetching from the CMS API at build/request time and parsing the result through the existing Zod schemas) without touching any component.
