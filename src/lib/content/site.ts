/**
 * Site-wide configuration: identity, address, contact and navigation.
 * VERIFIED facts are marked as such; everything else is sample/placeholder
 * data pending confirmation from the client. See /docs/content-required.md.
 */

export const siteConfig = {
  name: "Midpoint Tech",
  parentBrand: {
    name: "Midpoint",
    url: "https://www.mid-point.co.za/",
    description:
      "Midpoint Tech is a distinct technology-focused destination within the broader Midpoint commercial property portfolio, developed by Blend Property Group.",
  },
  tagline: "Space for technology businesses building what comes next.",
  description:
    "A connected business environment for startups, scale-ups and established technology teams at 300 Janadel Avenue in Midrand.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tech.mid-point.co.za",
  // VERIFIED: address supplied in project brief.
  address: {
    line1: "300 Janadel Avenue",
    line2: "Halfway House",
    city: "Midrand",
    region: "Gauteng",
    postalCode: "1685",
    country: "South Africa",
    countryCode: "ZA",
  },
  // UNCONFIRMED: coordinates are an approximate Halfway House, Midrand
  // reference point pending a verified pin for 300 Janadel Avenue. Replace
  // with the confirmed lat/lng before launch (see docs/content-required.md).
  geo: {
    lat: -25.9992,
    lng: 28.1265,
    verified: false,
  },
  contact: {
    // SAMPLE DATA: replace with the confirmed Midpoint Tech leasing line and
    // mailbox before launch. Do not reuse the parent estate's contact
    // details unless confirmed as shared infrastructure.
    phone: "+27 11 380 9400",
    phoneDisplay: "+27 11 380 9400",
    leasingEmail: "leasing@mid-point.co.za",
    generalEmail: "info@mid-point.co.za",
  },
  social: {
    // No confirmed Midpoint Tech social profiles at time of writing.
    linkedin: undefined as string | undefined,
    instagram: undefined as string | undefined,
  },
} as const;

export const primaryNav = [
  { label: "Spaces", href: "/spaces" },
  { label: "Experience", href: "/experience" },
  { label: "Location", href: "/location" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  explore: [
    { label: "Spaces", href: "/spaces" },
    { label: "Experience", href: "/experience" },
    { label: "Location", href: "/location" },
    { label: "Community", href: "/community" },
    { label: "News", href: "/news" },
  ],
  company: [
    { label: "About Midpoint Tech", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Book a tour", href: "/contact?intent=tour" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Website terms", href: "/terms" },
    { label: "PAIA manual", href: "/paia" },
  ],
} as const;
