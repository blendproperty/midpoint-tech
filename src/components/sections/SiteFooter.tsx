import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-100/10 bg-ink-950 text-stone-300">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold text-stone-100">
            Midpoint <span className="text-brass-400">Tech</span>
          </p>
          <p className="tick-label mt-2 text-stone-400">Technology precinct · Midrand</p>
          <address className="mt-4 not-italic text-sm leading-relaxed">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}, {site.address.province}
            <br />
            {site.address.postalCode}, {site.address.country}
          </address>
          <p className="coord-readout mt-3 text-stone-400/60">
            {Math.abs(site.address.lat).toFixed(4)}° S, {Math.abs(site.address.lng).toFixed(4)}° E
          </p>
          <p className="mt-6 text-sm">
            Part of{" "}
            <a href={site.parentBrandUrl} className="text-teal-400 hover:text-brass-400 underline underline-offset-4">
              {site.parentBrand}
            </a>
          </p>
        </div>

        <FooterColumn title="Explore" links={site.footerNav.explore} />
        <FooterColumn title="Company" links={site.footerNav.company} />

        <div>
          <p className="tick-label text-stone-400">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.contact.leasingEmail}`} className="hover:text-brass-400">
                {site.contact.leasingEmail}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneHref}`} className="hover:text-brass-400">
                {site.contact.phoneDisplay}
              </a>
              {site.contact.isSample && <span className="ml-1 text-stone-400/60">(sample)</span>}
            </li>
          </ul>
        </div>
      </Container>

      <div className="meridian-rule" data-on="ink" />

      <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-stone-400 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Midpoint Tech. All rights reserved.</p>
        <div className="flex gap-6">
          {site.footerNav.legal.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brass-400">
              {l.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="tick-label text-stone-400">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-brass-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
