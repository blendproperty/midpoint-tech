import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatSize(sqm: number) {
  return `${sqm.toLocaleString("en-ZA")} m²`;
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
