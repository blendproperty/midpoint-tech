"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site, CTA } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname() as string;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        "bg-ink-950/90 backdrop-blur-md",
        scrolled || open ? "border-stone-100/10 shadow-[0_1px_0_0_rgba(0,0,0,0.2)]" : "border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="group font-display text-lg font-semibold tracking-tight text-stone-100 transition-transform duration-300 hover:-translate-y-0.5"
        >
          Midpoint{" "}
          <span className="text-brass-400 transition-colors group-hover:text-brass-300">Tech</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative text-sm font-medium text-stone-200 transition-colors hover:text-brass-400",
                  active && "text-brass-400"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass-400 transition-transform duration-300 ease-out group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact?journey=tour" variant="primary" tone="on-ink">
            {CTA.bookTour}
          </Button>
        </div>

        <button
          type="button"
          className="p-2 text-stone-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-stone-100/10 bg-ink-950 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-base font-medium text-stone-100 hover:text-brass-400"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact?journey=tour" variant="primary" tone="on-ink" className="mt-3 justify-center">
              {CTA.bookTour}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
