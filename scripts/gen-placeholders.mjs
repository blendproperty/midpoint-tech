import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outRoot = join(__dirname, "..", "public", "media");

function svg(label, sub, w = 1200, h = 900) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#EDEFEA"/>
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#14231F" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="#14231F" stroke-opacity="0.25" stroke-width="1"/>
  <circle cx="${w / 2}" cy="${h / 2 - 20}" r="5" fill="#E0A63D"/>
  <text x="50%" y="${h / 2 + 30}" font-family="Arial, sans-serif" font-size="28" fill="#14231F" text-anchor="middle" font-weight="600">${label}</text>
  <text x="50%" y="${h / 2 + 62}" font-family="Arial, sans-serif" font-size="16" letter-spacing="2" fill="#2A413A" text-anchor="middle">${sub}</text>
</svg>`;
}

const files = [
  ["spaces/placeholder-office-1.svg", "SAMPLE IMAGE", "SUITE 201 — REPLACE BEFORE LAUNCH"],
  ["spaces/placeholder-office-2.svg", "SAMPLE IMAGE", "SUITE 201 ENTRANCE — REPLACE BEFORE LAUNCH"],
  ["spaces/placeholder-office-3.svg", "SAMPLE IMAGE", "SUITE 108 — REPLACE BEFORE LAUNCH"],
  ["spaces/placeholder-floor-1.svg", "SAMPLE IMAGE", "BLOCK B, FLOOR 4 — REPLACE BEFORE LAUNCH"],
  ["spaces/placeholder-desks-1.svg", "SAMPLE IMAGE", "SHARED DESKS, BLOCK C — REPLACE BEFORE LAUNCH"],
  ["floorplans/placeholder-floorplan.svg", "SAMPLE FLOOR PLAN", "REPLACE WITH SUPPLIED PLAN"],
  ["news/placeholder-news-1.svg", "SAMPLE IMAGE", "NEWS COVER — REPLACE BEFORE LAUNCH"],
  ["news/placeholder-news-2.svg", "SAMPLE IMAGE", "NEWS COVER — REPLACE BEFORE LAUNCH"],
  ["experience/placeholder-experience-1.svg", "SAMPLE IMAGE", "CAMPUS ENVIRONMENT — REPLACE BEFORE LAUNCH"],
  ["experience/placeholder-experience-2.svg", "SAMPLE IMAGE", "SHARED SPACE — REPLACE BEFORE LAUNCH"],
  ["experience/placeholder-experience-3.svg", "SAMPLE IMAGE", "LANDSCAPE — REPLACE BEFORE LAUNCH"],
  ["experience/placeholder-experience-4.svg", "SAMPLE IMAGE", "ARRIVAL — REPLACE BEFORE LAUNCH"],
  ["community/placeholder-community-1.svg", "SAMPLE IMAGE", "COMMUNITY — REPLACE BEFORE LAUNCH"],
  ["about/placeholder-about-1.svg", "SAMPLE IMAGE", "ABOUT — REPLACE BEFORE LAUNCH"],
  ["location/placeholder-location-1.svg", "SAMPLE IMAGE", "LOCATION — REPLACE BEFORE LAUNCH"],
];

for (const [rel, label, sub] of files) {
  const path = join(outRoot, rel);
  writeFileSync(path, svg(label, sub));
  console.log("wrote", rel);
}
