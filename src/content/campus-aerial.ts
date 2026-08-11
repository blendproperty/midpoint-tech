import { campusAerialPart1 } from "./campus-aerial-part1";
import { campusAerialPart2 } from "./campus-aerial-part2";
import { campusAerialPart3 } from "./campus-aerial-part3";
import { campusAerialPart4 } from "./campus-aerial-part4";
import { campusAerialPart5 } from "./campus-aerial-part5";
import { campusAerialPart6 } from "./campus-aerial-part6";
import { campusAerialPart7 } from "./campus-aerial-part7";
import { campusAerialPart8 } from "./campus-aerial-part8";
import { campusAerialPart9 } from "./campus-aerial-part9";
import { campusAerialPart10 } from "./campus-aerial-part10";
import { campusAerialPart11 } from "./campus-aerial-part11";

// Real aerial architectural rendering of the Midpoint Tech campus at
// 300 Janadel Avenue, Halfway House, Midrand — shows both office blocks
// (300 and 100), the covered parking structure, the circular atrium
// entrance, and the landscaped grounds along the road frontage.
//
// Stored as an inline base64 data URI (rather than a binary file in
// /public) because this repo's file-write path only reliably round-trips
// UTF-8 text content, not arbitrary binary bytes. The payload is split
// across 11 part files (campus-aerial-part1.ts .. part11.ts) purely to
// keep each individual commit small; campusAerialPartN is just a raw
// base64 substring with no other meaning.
const campusAerialParts: string[] = [
  campusAerialPart1,
  campusAerialPart2,
  campusAerialPart3,
  campusAerialPart4,
  campusAerialPart5,
  campusAerialPart6,
  campusAerialPart7,
  campusAerialPart8,
  campusAerialPart9,
  campusAerialPart10,
  campusAerialPart11,
];

export const campusAerialDataUri =
  "data:image/jpeg;base64," + campusAerialParts.join("");
