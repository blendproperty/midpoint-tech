/**
 * Site-wide configuration. In production this can be swapped for
 * a CMS-driven or environment-driven source without changing the
 * shape consumers rely on — see docs/content-management.md.
 */
export const site = {
  name: "Midpoint Tech",
  parentBrand: "Midpoint",
  parentBrandUrl: "https://www.mid-point.co.za/",
  domain: "tech.mid-point.co.za",
  tagline: "Spaces to lease in a technology-forward precinct.",
  description:
    "Midpoint Tech is a technology-forward precinct — connected office space for startups, scale-ups and established technology teams at 300 Janadel Avenue, Midrand.",
  address: {
    line1: "300 Janadel Avenue",
    line2: "Halfway House",
    city: "Midrand",
    province: "Gauteng",
    postalCode: "1685",
    country: "South Africa",
    // Sample coordinates for Halfway House, Midrand — confirm exact pin before launch.
    lat: -25.9895,
    lng: 28.1289,
    isSample: true,
  },
  contact: {
    leasingEmail: "leasing@mid-point.co.za",
    generalEmail: "info@mid-point.co.za",
    phoneDisplay: "+27 (0)11 000 0000",
    phoneHref: "+27110000000",
    isSample: true,
  },
  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    isSample: true,
  },
  nav: [
    { label: "Spaces", href: "/spaces" },
    { label: "Experience", href: "/experience" },
    { label: "Location", href: "/location" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/about" },
  ],
  footerNav: {
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
      { label: "Book a tour", href: "/contact?journey=tour" },
    ],
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "PAIA manual", href: "/paia" },
    ],
  },
} as const;

export const CTA = {
  primary: "Explore available spaces",
  bookTour: "Book a tour",
  speakToLeasing: "Speak to leasing",
  downloadBrochure: "Download brochure",
} as const;
