# Asset register

All imagery currently shipped is an original, elegant, clearly-labelled SVG placeholder generated for this build (`scripts/gen-placeholders.mjs` → `public/media/`). No third-party stock or copyrighted imagery has been used anywhere in this project.

| Asset | Recommended dimensions | Orientation | File type | Page(s) | Alt-text requirement | Supplied? | Licensing |
|---|---|---|---|---|---|---|---|
| Suite 201 gallery (×2) | 2400×1800 min | Landscape | JPG/WebP | `/spaces/block-a-suite-201` | Describe room, key features | No | N/A — pending client photography |
| Full Floor 4 gallery | 2400×1800 min | Landscape | JPG/WebP | `/spaces/block-b-floor-4` | Describe space, condition | No | N/A |
| Suite 108 gallery | 2400×1800 min | Landscape | JPG/WebP | `/spaces/block-a-suite-108` | Describe room | No | N/A |
| Shared desks gallery | 2400×1800 min | Landscape | JPG/WebP | `/spaces/block-c-desks` | Describe desk area | No | N/A |
| Floor plans (×4) | Vector or 2400px min | Landscape/portrait as supplied | PDF or PNG/SVG | Space detail pages | "Floor plan for [unit]" | No | N/A |
| Brochures (×4) | N/A | N/A | PDF | Space detail pages | N/A (download link) | No | N/A |
| Experience moments (×4) | 2000×1500 min | Landscape | JPG/WebP | `/experience`, homepage | Describe the moment shown | No | N/A |
| About campus image | 1600×2000 min | Portrait | JPG/WebP | `/about` | Describe campus/building | No | N/A |
| Location image | 1600×1200 min | Landscape | JPG/WebP | `/location` | N/A — replaced by map panel | No | N/A |
| Community image | 1600×1200 min | Landscape | JPG/WebP | `/community` | Describe community context | No | N/A |
| News covers (×2, ongoing) | 1600×1000 min | Landscape | JPG/WebP | `/news`, article pages | Describe article topic | No | N/A |
| Tenant logos | SVG preferred, min 400px wide PNG fallback | N/A | SVG/PNG | Homepage social proof, `/community` | "[Tenant] logo" | No — none exist yet | Requires written tenant authorisation before use |
| Hero background media | 2560×1440 min (or video, see below) | Landscape | JPG/WebP/MP4 | Homepage | N/A (decorative) or descriptive if meaningful | No | N/A |

## Video (optional, hero)

If a hero video is supplied later: provide an H.264 MP4 under 8MB with a static poster JPG fallback, muted/autoplay-safe, with captions if any spoken content is included. Do not autoplay heavy video on constrained connections — see `docs/accessibility.md` and `docs/security.md` performance notes.

## Process for adding real assets

1. Drop optimised images into `public/media/<section>/`.
2. Update the corresponding `gallery` / `cover` / `floorPlan` entries in `src/content/spaces.ts` or `src/content/news.ts`, writing real, descriptive `alt` text for each.
3. Remove `isSample: true` once every field on that record is verified, not just the image.
4. Run `npm run build` locally to confirm no broken image references.
