"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/content/site";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-[var(--duration-base)]",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[var(--container-max)] items-center justify-between px-[var(--gutter)] py-3">
        <Link href="/" className="flex items-center gap-2 font-[var(--font-display)] text-lg font-semibold tracking-tight">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-[var(--color-signal)]" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium hover:text-[var(--color-signal-strong)]",
                  active && "text-[var(--color-signal-strong)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact?intent=tour" size="md" className="hidden sm:inline-flex">
            Book a tour
          </Button>
          <button
            type="button"
            className="rounded-[var(--radius-md)] border border-[var(--color-line)] p-2.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
