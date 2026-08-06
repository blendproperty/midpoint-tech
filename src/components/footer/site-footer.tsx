import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/content/site";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="section-dark grid-motif border-t border-[var(--color-line-dark)]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-[var(--font-display)] text-lg font-semibold">{siteConfig.name}</p>
            <address className="mt-3 text-sm not-italic text-[var(--color-paper-dim)]">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}, {siteConfig.address.city}
              <br />
              {siteConfig.address.region}, {siteConfig.address.postalCode}
              <br />
              {siteConfig.address.country}
            </address>
            <p className="mt-4 text-sm">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${siteConfig.contact.leasingEmail}`} className="hover:underline">
                {siteConfig.contact.leasingEmail}
              </a>
            </p>
          </div>

          <FooterColumn title="Explore" items={footerNav.explore} />
          <FooterColumn title="Company" items={footerNav.company} />
          <div>
            <FooterColumn title="Legal" items={footerNav.legal} />
            <p className="mt-6 text-sm text-[var(--color-paper-dim)]">
              Part of the{" "}
              <a href={siteConfig.parentBrand.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Midpoint
              </a>{" "}
              portfolio, developed by Blend Property Group.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-line-dark)] pt-6 text-xs text-[var(--color-paper-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Content marked &ldquo;sample data&rdquo; is placeholder content pending confirmation. See docs/content-required.md.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-paper-dim)]">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
