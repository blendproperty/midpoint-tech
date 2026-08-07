import type { Metadata } from "next";
import { LegalDoc } from "@/components/ui/LegalDoc";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy policy" updated="Draft — pending legal review">
      <p>
        This is a placeholder privacy policy prepared for development purposes. It must be reviewed and
        finalised by a qualified legal advisor before public launch, with specific reference to South
        Africa&apos;s Protection of Personal Information Act (POPIA).
      </p>
      <h2>Information we collect</h2>
      <p>
        When you submit a form on this site (tour booking, leasing enquiry, or general contact), we collect
        the information you provide directly, such as your name, company, email address and phone number.
      </p>
      <h2>How we use it</h2>
      <p>Submitted information is used solely to respond to your enquiry and, where you have consented, to follow up about leasing opportunities at Midpoint Tech.</p>
      <h2>Analytics</h2>
      <p>Where enabled and consented to, we use privacy-conscious analytics to understand site usage. Personal form data is never sent to analytics tools.</p>
      <h2>Your rights</h2>
      <p>Under POPIA you have the right to request access to, correction of, or deletion of your personal information. Contact details for this request will be finalised before launch.</p>
    </LegalDoc>
  );
}
