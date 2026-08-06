"use client";
import Link from "next/link";
import { primaryNav } from "@/lib/content/site";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu">
      <nav aria-label="Primary" className="flex flex-col gap-1">
        {primaryNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-[var(--radius-md)] px-3 py-3 text-base font-medium hover:bg-[var(--color-paper-dim)]",
                active && "text-[var(--color-signal-strong)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 border-t border-[var(--color-line)] pt-6">
        <Button href="/contact?intent=tour" className="w-full" onClick={onClose}>
          Book a tour
        </Button>
      </div>
    </Drawer>
  );
}
