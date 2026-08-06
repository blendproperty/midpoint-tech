# Content required before launch

Everything below is currently **sample/placeholder data**, clearly marked `isSample: true` in code (`src/content/spaces.ts`, `src/content/news.ts`, `src/content/site.ts`). Nothing here should be treated as a verified property fact.

## Property / leasing data (`src/content/spaces.ts`)

| Field | Status | Notes |
|---|---|---|
| Unit names, building references | Sample | 4 illustrative units seeded |
| GLA / unit sizes | Sample | Replace with surveyed figures |
| Rental rates | Not set | All units show "on request" — populate `rentalPerSqm` and set `rentalDisplay: "approved"` once pricing is authorised for public display |
| Availability dates | Sample | Confirm real occupation dates |
| Parking bays per unit | Sample | Confirm parking ratio/allocation |
| Specification tables | Sample | Confirm ceiling heights, fit-out condition, fibre readiness etc. |
| Photography | Placeholder SVGs | Replace with licensed property photography — see `docs/asset-register.md` |
| Floor plans | Placeholder SVG | Replace with real PDF/image floor plans |
| Brochures | Not set (`brochureUrl: null`) | Add PDF brochure links once available |

## Site-wide facts (`src/content/site.ts`)

- `contact.phoneDisplay` / `phoneHref` — sample number, replace with the real leasing line
- `contact.leasingEmail` / `generalEmail` — confirm these are the correct live addresses
- `address.lat` / `address.lng` — sample coordinates for Halfway House; confirm the exact pin
- `social.linkedin` / `social.instagram` — not set; add once official accounts exist

## Building / campus facts

Not currently claimed anywhere on the site (per the brief's explicit "do not invent" list), and must be supplied before adding:

- Number of buildings, total rentable area
- Generator capacity, water-backup capacity
- Fibre provider(s) and available internet speeds
- Security and access-control system specifications
- Building grade / sustainability certifications, solar capacity
- Precise drive times to Johannesburg CBD / Pretoria CBD
- Confirmed public-transport (e.g. Gautrain feeder bus) information

## Community / tenant ecosystem (`/community`, homepage social proof)

- Tenant logos, names and testimonials — **none exist in this codebase**; the homepage "Tenant ecosystem" section and `/community` page intentionally render an empty state until authorised assets are supplied
- Event programme, talks/workshops schedule
- Any formal partnerships (university, accelerator, investor network) — do not add without written confirmation

## News (`src/content/news.ts`)

- Both seeded articles are placeholder copy and must be replaced with real, fact-checked announcements before launch

## Legal

- `/privacy`, `/terms`, `/paia` are drafted placeholders and require review/finalisation by a qualified legal advisor (South African POPIA compliance in particular) — see `docs/launch-checklist.md`
