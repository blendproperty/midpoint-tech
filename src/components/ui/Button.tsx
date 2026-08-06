import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Common = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  tone?: "on-stone" | "on-ink";
  className?: string;
  icon?: boolean;
};

const base =
  "inline-flex items-center gap-2 px-6 py-3 text-[0.95rem] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-[2px]";

function variantClasses(variant: Common["variant"], tone: Common["tone"]) {
  if (variant === "primary") {
    return "bg-brass-500 text-ink-950 hover:bg-brass-400";
  }
  if (variant === "secondary") {
    return tone === "on-ink"
      ? "border border-stone-300/40 text-stone-100 hover:border-stone-100 hover:bg-white/5"
      : "border border-ink-900/30 text-ink-900 hover:border-ink-900 hover:bg-ink-900/5";
  }
  return tone === "on-ink" ? "text-stone-100 hover:text-brass-400" : "text-ink-900 hover:text-teal-500";
}

export function Button({
  children,
  href,
  variant = "primary",
  tone = "on-stone",
  className,
  icon = true,
  onClick,
  type = "button",
}: Common & { href?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const classes = cn(base, variantClasses(variant, tone), className);
  const content = (
    <>
      {children}
      {icon && <ArrowUpRight className="h-4 w-4" aria-hidden />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
