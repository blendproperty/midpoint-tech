import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatSqm(value: number): string {
  return `${new Intl.NumberFormat("en-ZA").format(value)} m²`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-ZA", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(iso)
  );
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech.mid-point.co.za";
  return new URL(path, base).toString();
}

export function formatCoord(value: number, positiveLabel: string, negativeLabel: string): string {
  const label = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(4)}° ${label}`;
}
