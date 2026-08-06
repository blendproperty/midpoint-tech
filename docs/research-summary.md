# Research summary — Midpoint Tech

This summary was prepared to ground the site's positioning and content decisions. It is intentionally split into three tiers so nothing unverified is presented as fact on the live site.

## Verified facts

- Address: 300 Janadel Avenue, Halfway House, Midrand, Gauteng, 1685, South Africa.
- Midpoint Tech is positioned as a distinct proposition from the broader Midpoint commercial portfolio (`https://www.mid-point.co.za/`), which also includes offices, serviced offices and warehousing elsewhere on the estate.
- Midrand sits geographically between Johannesburg and Pretoria on the N1 corridor, within Gauteng province.
- This build brief explicitly instructs: do not claim warehouse facilities, warehouse vacancies, warehouse specifications, or Tonetti Street buildings are situated at 300 Janadel Avenue.

## Reasonable positioning recommendations

- Position Midpoint Tech as a technology-specific sub-brand of Midpoint, rather than a generic multi-tenant office park — this differentiates it from the parent site's broader commercial offering.
- Lead with the Midrand corridor location as a practical, not aspirational, selling point (serves both Johannesburg and Pretoria without requiring a location commitment to either).
- Avoid formal claims of an accelerator, incubator, funding access or university partnerships unless and until the client confirms a real programme — the "Community" page is structured so these can be activated later without a redesign.
- Use "space for technology businesses building what comes next" as a working headline territory rather than generic property language ("state-of-the-art", "world-class destination", etc.), per the brief's explicit list of clichés to avoid.

## Information still requiring confirmation

The following must be confirmed by the Midpoint Tech team before launch — see `docs/content-required.md` for the full list and where each item is used in the codebase:

- Exact available units, sizes, and rental rates
- Parking ratios, generator and water-backup capacity
- Fibre providers and internet speeds
- Security and access-control specifications
- Building grade and any sustainability certifications
- Occupation dates for each listed space
- Tenant names, testimonials, and logos (none are fabricated anywhere in this codebase)
- Event programme, if any
- Restaurant/retail amenities, auditorium or conference facilities
- Precise drive times to Johannesburg/Pretoria and confirmed public-transport options
- Number of buildings and total rentable area for the whole campus
- Exact GPS coordinates for the location page and structured data (current values are clearly flagged as sample data in `src/content/site.ts`)

## Competitive / category context (general, not brand-specific research)

Leading technology campuses and premium flexible-workspace operators typically differentiate on: clarity of available-space information (size, price, floor plan, photos), a credible but not overstated community narrative, strong photography over illustration, and a straightforward, low-friction tour-booking path. This build follows that pattern: a dedicated `/spaces` explorer with filtering, a persistent "Book a tour" CTA, and a community section that is honest about what is confirmed versus aspirational.
