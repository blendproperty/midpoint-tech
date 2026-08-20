/**
 * Building marker positions on the campus aerial rendering (percentage of
 * image width/height). Shared between the Hero schematic overlay and the
 * CampusExplorer so both plot the same three points from one source.
 * Recalibrate against final published site-plan imagery before launch.
 */
export const campusBuildings = [
  {
    id: "block-a",
    reference: "Block A",
    label: "Block A",
    code: "A",
    description: "The building's western wing, with a mix of fitted suites and dual-aspect glazing.",
    x: 51,
    y: 24,
  },
  {
    id: "block-b",
    reference: "Block B",
    label: "Block B",
    code: "B",
    description: "The eastern wing — full-floor and shell-and-core space for larger teams.",
    x: 74,
    y: 26,
  },
  {
    id: "block-c",
    reference: "Block C",
    label: "The Atrium",
    code: "C",
    description: "The circular atrium building at the heart of the campus — flexible and desk-based space.",
    x: 47,
    y: 49,
  },
] as const;
