import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  dark = false,
  motif = false,
  as: Tag = "section",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
  motif?: boolean;
  as?: React.ElementType;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-24 md:py-40",
        dark && "section-dark",
        motif && "grid-motif",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
