# Design system — "The Meridian Line"

## Concept

Midpoint Tech sits literally on the business corridor between Johannesburg and Pretoria. The design system is built around a single signature device — a coordinate/survey line with a travelling marker — that threads through the homepage (`MeridianLine` component connecting Work / Connect / Grow) and reappears as the location marker on `/location`. This was chosen deliberately over the current default AI-generated aesthetics (warm cream + serif + terracotta; near-black + neon accent; broadsheet hairline grid) to give the brand something specific to its own geography and positioning, rather than a template look.

## Colour

Defined as CSS variables in `src/app/globals.css` and exposed to Tailwind via `@theme`:

- **Ink** (`--ink-900` `#14231F` and steps) — deep pine-charcoal, not pure black; carries a green cast that ties to landscaped grounds rather than reading as generic "dark mode."
- **Stone** (`--stone-50` `#F5F6F2` and steps) — cool pale sage-grey paper, deliberately not the cream/off-white default.
- **Brass** (`--brass-500` `#E0A63D`) — the single signal accent, used sparingly for primary actions, the meridian marker, and status highlights. Named for a survey/datum marker.
- **Teal** (`--teal-500` `#1F6F63`) — secondary structural colour for links and secondary emphasis.

## Typography

- Display: **Space Grotesk** (500/600/700) — architectural, technical grotesk, used for all headings via `font-display` / `.font-display`.
- Body: **Manrope** (400–700) — highly legible, warm-neutral sans for body copy.
- Self-hosted via `@fontsource/manrope` and `@fontsource/space-grotesk`, imported directly in `src/app/layout.tsx`. Font files ship inside `node_modules` and are bundled by Next.js at build time — no runtime *or* build-time request to Google Fonts, and no internet access is required to build the project.
- Fluid type scale (`--step--1` through `--step-5`) defined with `clamp()` in `globals.css`, exposed as Tailwind utilities `text-step--1` … `text-step-5`.

## Spacing & grid

- Content max-width: 1240px (`Container` component), with responsive `px-6 md:px-10` gutters.
- Sections use consistent vertical rhythm: `py-20 md:py-28` (`Section` component).

## Border radius, borders, shadows

- Radius is intentionally near-zero (`--radius-sm: 2px`, `--radius-md: 4px`) — architectural/blueprint feel rather than app-like rounded cards.
- Hairline borders (`border-ink-900/12`, `.meridian-rule`) are preferred over shadows. Shadows, where used, are restrained (a single bottom accent line on hover, not drop shadows).

## Motion tokens

- `--duration-fast: 150ms`, `--duration-base: 300ms`, `--duration-slow: 500ms`; `--ease-out` is a deliberate ease-out curve.
- All Framer Motion entrance animations respect `prefers-reduced-motion` (see `useReducedMotion()` usage in `Hero`, `MeridianLine`, `Metric`).
- The meridian marker's looping animation and the metric count-up are the only continuous/animated elements; everything else is a one-time, viewport-triggered reveal.

## Icon usage

Lucide icons only, used functionally (navigation, form affordances, gallery controls) — never decoratively at large scale.

## Buttons

Three variants (`Button` component): `primary` (brass fill), `secondary` (hairline border), `ghost` (text-only). Each supports an `on-ink` / `on-stone` tone for correct contrast on dark vs light sections.

## Forms

Flat, bordered inputs (`inputClasses` in `FormField.tsx`) with a 2px teal focus ring, inline error messages via `role="alert"`, and a visually-hidden honeypot field per form.

## Cards

No rounded corners, no drop shadows by default — hairline border, and on hover a single 1px brass accent line at the top (see `AvailabilityPreview`, `SpaceCard`). This keeps the "template card grid" look at bay per the brief's explicit warning against it.

## Image treatment

`MediaFrame` renders all photography inside a fixed-aspect-ratio container with `object-cover`, avoiding layout shift; the `Gallery` component adds a keyboard- and touch-accessible lightbox for space detail pages.

## Dark / light section rule

Sections alternate `tone="stone"` (light), `tone="raised"` (white), and `tone="ink"` (dark) deliberately to create rhythm down the page — see `Section` component's `tone` prop, used consistently across all pages rather than arbitrary background colours.

## Accessibility constraints baked into the system

- All interactive elements use `:focus-visible` with a 2px brass outline (see `globals.css`).
- Colour is never the only status indicator — `StatusBadge` pairs colour with a text label.
- Body text on stone/ink backgrounds meets WCAG AA contrast at the chosen ink/stone/brass values.
