# Analytics & privacy

## Setup

The app is prepared for Google Tag Manager: set `NEXT_PUBLIC_GTM_ID` in the environment, then wire up a `<Script>` loader for GTM in `src/app/layout.tsx` once a real container ID and consent-management approach are confirmed. GA4 should be configured **through** GTM, not loaded directly, so that consent gating happens in one place.

## Consent-aware tracking

All custom events flow through `track()` in `src/lib/analytics.ts`. It:

- **Checks for consent first.** No event fires unless `localStorage.getItem("mt-analytics-consent") === "granted"`. Wire this flag up to a real cookie-consent banner before launch — this is currently a placeholder gate, not a full consent-management platform. See "Final legal review" below.
- **Strips personal fields.** Any key named `email`, `workEmail`, `phone`, `fullName`, `name`, `message`, or `company` is dropped before the event is pushed to `dataLayer`, regardless of what a caller passes in.

## Tracked events

| Event | Fired from |
|---|---|
| `view_space` | Clicking a space card in the explorer |
| `filter_spaces` | Changing any filter/sort control |
| `click_book_tour` | (wire up on nav/CTA click handlers as needed) |
| `start_tour_form` | Tour form submission attempt begins |
| `submit_tour_form` | Tour form successfully submitted |
| `submit_leasing_enquiry` | Leasing form successfully submitted |
| `download_brochure` | (wire up once real brochure links exist) |
| `click_phone` / `click_email` | (wire up on footer/contact links as needed) |
| `get_directions` | (wire up on directions links) |
| `gallery_interaction` | Opening the full-screen gallery lightbox |

Some events are defined in the `AnalyticsEvent` type but not yet wired to every possible trigger point — search `track(` in the codebase before launch and confirm coverage matches the final analytics plan.

## Final legal review required

Before launch, a qualified advisor should confirm the consent banner, cookie policy, and analytics configuration meet **POPIA** requirements for a South African audience — the current `mt-analytics-consent` flag is a functional placeholder, not a compliance solution on its own.
