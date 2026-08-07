import { spaceSchema, type Space } from "./schema";

/**
 * SAMPLE DATA — every record here is clearly-labelled placeholder
 * content (isSample: true). None of these units, sizes, rentals or
 * specifications are verified. Replace via docs/content-required.md
 * before launch. See docs/content-management.md for how to edit.
 *
 * Gallery images are real, free-to-use photos sourced from Unsplash
 * (illustrative stock photography, not actual photos of this
 * building — swap for real site photography before launch).
 */
const raw: Space[] = [
  {
    slug: "block-a-suite-201",
    name: "Suite 201",
    buildingReference: "Block A",
    type: "office-suite",
    status: "available",
    glaSqm: 186,
    floor: "2nd floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "2026-10-01",
    summary:
      "A bright corner suite with two glazed elevations, suited to a growing product or engineering team.",
    highlights: [
      "Open-plan with two enclosed meeting rooms",
      "Corner position with dual aspect glazing",
      "Fibre-ready riser access",
      "Direct lift lobby access",
    ],
    specification: [
      { label: "GLA", value: "186 m²" },
      { label: "Floor", value: "2nd floor, Block A" },
      { label: "Layout", value: "Open plan + 2 meeting rooms" },
      { label: "Fit-out", value: "Fitted — sample condition" },
    ],
    parkingBays: 9,
    gallery: [
      { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of an open-plan office interior with desks, similar in feel to Suite 201" },
      { src: "https://images.unsplash.com/photo-1758448500688-3ababa93fd67?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a modern lobby with reception desk, similar in feel to the entrance to Suite 201" },
    ],
    floorPlan: { src: "/media/floorplans/placeholder-floorplan.svg", alt: "Placeholder floor plan for Suite 201" },
    brochureUrl: null,
    isSample: true,
  },
  {
    slug: "block-b-floor-4",
    name: "Full Floor 4",
    buildingReference: "Block B",
    type: "full-floor",
    status: "available",
    glaSqm: 940,
    floor: "4th floor (whole floor)",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "2027-01-01",
    summary:
      "An entire floor plate for a company that wants a single, brandable environment with its own identity.",
    highlights: [
      "Full-floor exclusivity",
      "Shell and core — configurable layout",
      "Dedicated after-hours access control",
      "Signage opportunity on entrance lobby",
    ],
    specification: [
      { label: "GLA", value: "940 m²" },
      { label: "Floor", value: "4th floor, Block B" },
      { label: "Condition", value: "Shell and core" },
      { label: "Ceiling height", value: "Sample data — confirm on inspection" },
    ],
    parkingBays: 47,
    gallery: [
      { src: "https://images.unsplash.com/photo-1780668495634-28c1151bbec2?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a spacious open shell-and-core interior with high ceilings and natural light, similar in feel to Block B's 4th floor" },
    ],
    floorPlan: { src: "/media/floorplans/placeholder-floorplan.svg", alt: "Placeholder floor plan for Block B, 4th floor" },
    brochureUrl: null,
    isSample: true,
  },
  {
    slug: "block-a-suite-108",
    name: "Suite 108",
    buildingReference: "Block A",
    type: "office-suite",
    status: "coming-soon",
    glaSqm: 96,
    floor: "1st floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "2027-02-01",
    summary: "A compact ground-adjacent suite well suited to an early-stage team of eight to twelve people.",
    highlights: [
      "Efficient footprint for a lean team",
      "Close to ground-floor amenities",
      "Private entrance option",
    ],
    specification: [
      { label: "GLA", value: "96 m²" },
      { label: "Floor", value: "1st floor, Block A" },
      { label: "Layout", value: "Open plan" },
    ],
    parkingBays: 5,
    gallery: [
      { src: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a compact open-plan office with desks and chairs, similar in feel to Suite 108" },
    ],
    floorPlan: null,
    brochureUrl: null,
    isSample: true,
  },
  {
    slug: "block-c-desks",
    name: "Shared Desks — Block C",
    buildingReference: "Block C",
    type: "co-working-desk",
    status: "available",
    glaSqm: 4,
    floor: "Ground floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "2026-09-01",
    summary: "Flexible desks for founders and small teams who want a credible address without a long lease.",
    highlights: [
      "Month-to-month flexibility",
      "Shared meeting room access",
      "Professional address for correspondence",
    ],
    specification: [
      { label: "Desk type", value: "Hot desk or dedicated desk" },
      { label: "Floor", value: "Ground floor, Block C" },
      { label: "Minimum term", value: "Sample data — confirm terms" },
    ],
    parkingBays: null,
    gallery: [
      { src: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of people working at shared desks with laptops, similar in feel to the Block C shared desk area" },
    ],
    floorPlan: null,
    brochureUrl: null,
    isSample: true,
  },
];

export const spaces: Space[] = raw.map((s) => spaceSchema.parse(s));

export function getSpaceBySlug(slug: string): Space | undefined {
  return spaces.find((s) => s.slug === slug);
}

export function getRelatedSpaces(current: Space, limit = 3): Space[] {
  return spaces
    .filter((s) => s.slug !== current.slug)
    .sort((a, b) => Math.abs(a.glaSqm - current.glaSqm) - Math.abs(b.glaSqm - current.glaSqm))
    .slice(0, limit);
}
