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
  "group inline-flex items-center gap-2 px-6 py-3 text-[0.95rem] font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 rounded-[2px] hover:scale-[1.03] active:scale-[0.96] will-change-transform";

function variantClasses(variant: Common["variant"], tone: Common["tone"]) {
  if (variant === "primary") {
    return "bg-brass-500 text-ink-950 hover:bg-brass-400 shadow-[0_0_0_0_rgba(224,166,61,0)] hover:shadow-[0_8px_24px_-8px_rgba(224,166,61,0.55)]";
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
      {icon && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
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
