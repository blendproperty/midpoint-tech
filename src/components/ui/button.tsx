import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Common = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] rounded-[var(--radius-md)] min-h-11 focus-visible:outline-3";

const variants: Record<NonNullable<Common["variant"]>, string> = {
  primary:
    "bg-[var(--color-signal)] text-[var(--color-signal-on)] hover:bg-[var(--color-signal-strong)]",
  secondary:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
  ghost: "bg-transparent text-current underline underline-offset-4 hover:no-underline",
};

const sizes: Record<NonNullable<Common["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  showArrow = false,
  onClick,
  type = "button",
}: Common & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {showArrow && <ArrowUpRight className="size-4" aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {showArrow && <ArrowUpRight className="size-4" aria-hidden="true" />}
    </button>
  );
}
