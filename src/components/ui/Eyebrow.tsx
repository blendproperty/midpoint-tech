import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("tick-label flex items-center gap-3 text-brass-600", className)}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
