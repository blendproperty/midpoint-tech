"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/content/site";

export function AddressCopyButton() {
  const [copied, setCopied] = useState(false);
  const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.province}, ${site.address.postalCode}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, link/text remains visible.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 border border-ink-900/30 px-6 py-3 text-sm font-medium text-ink-900 hover:border-ink-900"
    >
      {copied ? <Check className="h-4 w-4 text-teal-600" /> : <Copy className="h-4 w-4" />}
      {copied ? "Address copied" : "Copy address"}
    </button>
  );
}
