import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of use" updated="Draft — pending legal review">
      <p>
        This is a placeholder terms-of-use document prepared for development purposes and must be reviewed
        by a qualified legal advisor before public launch.
      </p>
      <h2>Use of this website</h2>
      <p>This website provides information about Midpoint Tech, a commercial property at 300 Janadel Avenue, Halfway House, Midrand. Content is provided for general information and does not constitute a legally binding offer to lease.</p>
      <h2>Property information</h2>
      <p>Space availability, sizes, rentals and specifications are subject to change and confirmation. Figures marked as sample data are illustrative only.</p>
      <h2>Intellectual property</h2>
      <p>All content on this site remains the property of Midpoint / Midpoint Tech unless otherwise stated.</p>
    </LegalDoc>
  );
}
