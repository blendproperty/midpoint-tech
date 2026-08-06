import { spacesCollectionSchema, type Space } from "./spaces.schema";

/**
 * SAMPLE DATA — every record below is placeholder content used to build and
 * demonstrate the availability experience. `sample: true` is enforced by the
 * schema. Replace with verified unit data from the leasing team before
 * launch; see /docs/content-required.md for the full outstanding list.
 */
const rawSpaces: Space[] = [
  {
    slug: "suite-201-north-wing",
    sample: true,
    name: "Suite 201, North Wing",
    buildingReference: "Building A",
    type: "office",
    status: "available",
    sizeSqm: 312,
    floor: "2nd floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "Immediate",
    summary:
      "A full-floor suite with private client reception, open-plan work areas and a boardroom shell, ready for tenant fit-out.",
    description:
      "Suite 201 occupies the north-facing side of Building A, with a private lift lobby, raised access flooring and an open floor plate suited to a technology team of roughly 25–35 people. The suite is delivered as a warm shell, allowing an incoming tenant to configure the internal layout to their own specification.",
    highlights: [
      "Private lift lobby and reception point",
      "Raised access flooring for cable management",
      "Warm-shell finish — configurable to tenant requirements",
      "North-facing natural light along the full floor plate",
    ],
    specifications: [
      { label: "Gross lettable area", value: "312 m² (sample)" },
      { label: "Floor", value: "2nd floor" },
      { label: "Finish", value: "Warm shell" },
      { label: "Lease term", value: "On request" },
    ],
    parkingBays: 12,
    images: [
      { src: "/images/spaces/placeholder-office-1.svg", alt: "Placeholder image representing Suite 201, North Wing — real photography pending", width: 1600, height: 1000 },
      { src: "/images/spaces/placeholder-office-2.svg", alt: "Placeholder image representing the open work area in Suite 201 — real photography pending", width: 1600, height: 1000 },
    ],
    floorPlan: { src: "/floorplans/placeholder-suite-201.svg", alt: "Placeholder floor plan for Suite 201 — indicative only, pending confirmed drawings", fileType: "image" },
    brochureUrl: undefined,
  },
  {
    slug: "studio-14-innovation-court",
    sample: true,
    name: "Studio 14, Innovation Court",
    buildingReference: "Building B",
    type: "studio",
    status: "available",
    sizeSqm: 96,
    floor: "Ground floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "Immediate",
    summary:
      "A compact ground-floor studio suited to an early-stage team, with direct access to shared courtyard space.",
    description:
      "Studio 14 is sized for a founding team of around 8–12 people, with direct street-level access and proximity to shared meeting and breakout areas. It suits a startup or scale-up wanting a professional, client-ready base without committing to a full floor.",
    highlights: [
      "Ground-floor, direct-access studio",
      "Proximity to shared meeting rooms",
      "Suited to teams of approximately 8–12",
      "Flexible lease terms available on request",
    ],
    specifications: [
      { label: "Gross lettable area", value: "96 m² (sample)" },
      { label: "Floor", value: "Ground floor" },
      { label: "Finish", value: "Fitted — sample specification" },
      { label: "Lease term", value: "On request" },
    ],
    parkingBays: 4,
    images: [
      { src: "/images/spaces/placeholder-studio-1.svg", alt: "Placeholder image representing Studio 14, Innovation Court — real photography pending", width: 1600, height: 1000 },
    ],
    floorPlan: undefined,
    brochureUrl: undefined,
  },
  {
    slug: "onwork-serviced-suite-6",
    sample: true,
    name: "Serviced Suite 6",
    buildingReference: "Building A",
    type: "serviced-office",
    status: "coming-soon",
    sizeSqm: 48,
    floor: "3rd floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "Q1 2027 (sample date)",
    summary:
      "A fully serviced private office within a shared floor, suited to a small team or satellite office.",
    description:
      "Serviced Suite 6 forms part of a managed floor offering private offices alongside shared reception, meeting and breakout facilities. It is intended for teams of 4–8 people who want a professional address with reduced setup time. Exact service inclusions are still being finalised and will be confirmed before this space is marketed as available.",
    highlights: [
      "Private suite within a managed, serviced floor",
      "Suited to teams of 4–8",
      "Shared reception and meeting facilities (specification to be confirmed)",
    ],
    specifications: [
      { label: "Gross lettable area", value: "48 m² (sample)" },
      { label: "Floor", value: "3rd floor" },
      { label: "Service model", value: "Serviced — inclusions to be confirmed" },
      { label: "Lease term", value: "On request" },
    ],
    parkingBays: 2,
    images: [
      { src: "/images/spaces/placeholder-serviced-1.svg", alt: "Placeholder image representing Serviced Suite 6 — real photography pending", width: 1600, height: 1000 },
    ],
    floorPlan: undefined,
    brochureUrl: undefined,
  },
  {
    slug: "flex-suite-08-scale-wing",
    sample: true,
    name: "Flex Suite 08, Scale Wing",
    buildingReference: "Building B",
    type: "flex-suite",
    status: "under-offer",
    sizeSqm: 540,
    floor: "1st floor",
    rentalPerSqm: null,
    rentalDisplay: "on-request",
    availableFrom: "Currently under offer",
    summary:
      "A larger flexible suite designed for a scale-up team needing room to grow, currently under offer.",
    description:
      "Flex Suite 08 is a larger-format space intended for scale-up and established technology teams of roughly 45–60 people. It is currently under offer; broker and tenant enquiries are welcome for similar upcoming availability in the Scale Wing.",
    highlights: [
      "Larger format, suited to teams of 45–60",
      "Configurable open-plan and cellular mix",
      "Currently under offer — enquire about similar upcoming space",
    ],
    specifications: [
      { label: "Gross lettable area", value: "540 m² (sample)" },
      { label: "Floor", value: "1st floor" },
      { label: "Finish", value: "Warm shell" },
      { label: "Lease term", value: "On request" },
    ],
    parkingBays: 20,
    images: [
      { src: "/images/spaces/placeholder-flex-1.svg", alt: "Placeholder image representing Flex Suite 08, Scale Wing — real photography pending", width: 1600, height: 1000 },
    ],
    floorPlan: undefined,
    brochureUrl: undefined,
  },
];

export const spaces: Space[] = spacesCollectionSchema.parse(rawSpaces);

export function getSpaceBySlug(slug: string): Space | undefined {
  return spaces.find((s) => s.slug === slug);
}

export function getAvailableSpaces(): Space[] {
  return spaces.filter((s) => s.status === "available");
}

export function getRelatedSpaces(current: Space, limit = 3): Space[] {
  return spaces
    .filter((s) => s.slug !== current.slug && s.type === current.type)
    .concat(spaces.filter((s) => s.slug !== current.slug && s.type !== current.type))
    .slice(0, limit);
}
