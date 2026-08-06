# Design system

## Brand principles
Midpoint Tech sits between contemporary commercial architecture, editorial
storytelling, and a technology-forward but warm (not neon/cyberpunk) visual
language — deliberately avoiding blue SaaS gradients, glassmorphism, generic
property "card grid" layouts, and stock-photo clichés.

## Colour
Defined as CSS custom properties in `src/app/globals.css`, mapped into Tailwind
v4's `@theme` block.

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#14140f` | Primary text, dark section backgrounds |
| `--color-ink-soft` | `#2a2a22` | Secondary/body text |
| `--color-paper` | `#f8f6f0` | Default page background |
| `--color-paper-dim` | `#efebe0` | Section backgrounds |
| `--color-line` | `#dcd6c4` | Hairline borders |
| `--color-signal` | `#cf4520` | Primary accent — CTAs, active states, focus ring |
| `--color-signal-strong` | `#a6350f` | Accent hover/active state |
| `--color-success` / `--color-error` | green / red | Form feedback only — never sole status indicator |

## Typography
- **Display**: Space Grotesk (variable), self-hosted via `next/font/local`.
- **Body**: Inter (variable), self-hosted via `next/font/local`.
- Type scale uses `clamp()` (see `Heading` component) for fluid responsive sizing.

## Spacing & grid
`--container-max: 1320px` with a fluid gutter (`clamp(1.25rem, 4vw, 3rem)`).

## Radii, borders, shadows
Restrained radii (2/4/10px). 1px hairline borders preferred over shadows.

## Motion tokens
Durations 150/250/450ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. All reveals run
once and respect `prefers-reduced-motion`.

## Components
`src/components/ui/`: `Container`, `Section`, `Heading`, `Button`, `MediaFrame`,
`Metric`, `Badge`, `EmptyState`/`SkeletonCard`, `Breadcrumbs`, form fields, `Dialog`,
`Drawer`, `Gallery`, `RichText`. Domain components compose these rather than
duplicating styling.

## Dark/light section rules
Light sections default; dark sections reserved for high-impact moments (hero,
ecosystem, final CTA, footer).

## Accessibility constraints baked into the system
Focus rings never suppressed; colour never the sole status indicator; minimum 44px
interactive target height.
