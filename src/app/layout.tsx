import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { siteConfig } from "@/lib/content/site";
import { organizationJsonLd } from "@/lib/seo";

// Self-hosted variable fonts (via next/font/local), sourced directly from the
// @fontsource-variable npm packages rather than vendored copies. This avoids
// committing binary font files to the repository while still avoiding any
// runtime dependency on fonts.googleapis.com (see docs/architecture.md).
const spaceGrotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
