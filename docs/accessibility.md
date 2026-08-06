# Accessibility

Target: WCAG 2.2 AA.

## What's implemented
- Skip-to-content link, visible on keyboard focus.
- One `<h1>` per page, logical heading hierarchy.
- Semantic landmarks throughout.
- Visible focus states everywhere via global `:focus-visible`.
- Keyboard-accessible navigation, mobile drawer, gallery (arrow keys), dialogs.
- Form fields use explicit labels, `aria-describedby`, `aria-invalid`, `role="alert"`.
- Colour never the only status signal.
- `prefers-reduced-motion` honoured globally and per-component.
- Minimum 44px interactive target height.
- Required, non-empty alt text on every image, including placeholders.

## Manual verification checklist (complete before launch)
- [ ] Full keyboard-only pass on every page.
- [ ] Screen reader pass (VoiceOver/NVDA) on mobile menu, filter drawer, gallery.
- [ ] 200% zoom check for horizontal scroll/clipping.
- [ ] Automated axe/Lighthouse accessibility audit against the production build.
- [ ] Contrast check of `--color-signal` on `--color-paper` for any new body-text use.
- [ ] Re-test with `prefers-reduced-motion: reduce` enabled at the OS level.

## Known limitation in this build
Automated e2e/accessibility test execution (Playwright) could not be run inside the
sandboxed build environment used for this project (no outbound access to download
browser binaries). The Playwright suite is written and ready to run with
`npx playwright install && npm run e2e` in a normal environment or CI.
