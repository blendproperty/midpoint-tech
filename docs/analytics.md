# Analytics

## Approach
GTM is the intended container for analytics. Set `NEXT_PUBLIC_GTM_ID` and add the
GTM snippet to `src/app/layout.tsx` when ready, ideally behind a consent gate.

## Event dispatch
`src/lib/analytics.ts` exposes `trackEvent(name, payload)`.

| Event | Fired from |
|---|---|
| `filter_spaces` | `SpaceFilters` on any filter change |
| `click_book_tour` | Hero and space-detail CTAs |
| `start_tour_form` | First focus into the tour form |
| `submit_tour_form` / `submit_leasing_enquiry` | Successful submissions |
| `get_directions` | Location page directions button |
| `gallery_interaction` | Space gallery navigation |

## Personal data is never sent to analytics
`sanitizeEventPayload` strips any key matching personal-data patterns and drops
nested objects as defence in depth.

## Consent
No cookie/consent banner is implemented. Add a consent-aware script loader before
enabling GTM/GA4 in production, appropriate for POPIA.
