import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";

export const metadata: Metadata = { title: "PAIA manual", alternates: { canonical: "/paia" } };

export default function PaiaPage() {
  return (
    <LegalDoc title="PAIA manual" updated="Draft — pending legal review">
      <p>
        This is a placeholder Promotion of Access to Information Act (PAIA) manual. A finalised manual,
        prepared or reviewed by a qualified legal advisor, must replace this placeholder before public launch.
      </p>
      <h2>Purpose</h2>
      <p>This manual is intended to describe how members of the public may request access to records held by the entity operating Midpoint Tech, in accordance with PAIA.</p>
      <h2>Contact for requests</h2>
      <p>The designated information officer and contact details for PAIA requests will be added here once confirmed.</p>
    </LegalDoc>
  );
}
