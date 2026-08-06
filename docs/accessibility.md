# Accessibility

Target: **WCAG 2.2 AA**.

## What's implemented

- Skip-to-content link (`.skip-link` in `globals.css`, `#main` landmark in `layout.tsx`)
- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`
- One `<h1>` per page, consistent heading hierarchy within sections
- Visible focus states everywhere via `:focus-visible` (2px brass outline, never `outline: none` without a replacement)
- Keyboard-accessible mobile navigation (`SiteNav`) with `aria-expanded`/`aria-controls`
- Keyboard-accessible gallery lightbox (`Gallery.tsx`) — arrow keys navigate, Escape closes, all buttons have `aria-label`s
- Accessible mobile filter drawer (`SpacesExplorer.tsx`) with `role="dialog"` and `aria-modal`
- Form labels tied to inputs via `htmlFor`/`id`, required fields marked, errors announced with `role="alert"`
- Status badges pair colour with a text label — never colour alone
- `prefers-reduced-motion` respected globally (see `globals.css` media query) and individually in `Hero`, `MeridianLine`, `Metric` via `useReducedMotion()`
- Descriptive `alt` text is enforced at the schema level — `mediaSchema` requires `alt` of at least 3 characters for every image (`src/content/schema.ts`)
- Breadcrumbs (`Breadcrumbs.tsx`) use `aria-current="page"` for the current page

## Manual checklist (run before launch)

- [ ] Tab through every page using only the keyboard; confirm focus order is logical and nothing is unreachable
- [ ] Test all forms with a screen reader (VoiceOver/NVDA); confirm error and success states are announced
- [ ] Zoom to 200% in the browser and confirm no horizontal scroll or clipped content on any page
- [ ] Test at 320px, 375px and 430px widths for touch-target size and readability
- [ ] Run an automated audit (axe DevTools or Lighthouse accessibility) against a production build and fix any flagged issues
- [ ] Confirm colour contrast for the final brass/teal accent values against both `stone` and `ink` backgrounds using a contrast checker, especially for small/secondary text
- [ ] Verify captions/transcripts are added if a hero video with spoken audio is ever introduced
- [ ] Confirm the reduced-motion experience (`prefers-reduced-motion: reduce` in OS settings) still fully communicates all content

## Known gaps to close before launch

- The consent banner referenced in `docs/analytics.md` does not yet exist as a UI component — it must be built as an accessible dialog when analytics are finalised.
- No automated accessibility test suite is wired into CI yet — see `docs/launch-checklist.md`.
