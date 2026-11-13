import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms and Conditions", robots: { index: false } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="November 2026">
      <div>
        <h2>Using this website</h2>
        <p>This website provides information about AXONO and its match recording service. By using it you agree to these terms.</p>
      </div>
      <div>
        <h2>Match recordings</h2>
        <p>Recordings are provided for the personal use of the players involved. Please respect the privacy of other players when sharing recordings.</p>
      </div>
      <div>
        <h2>Content</h2>
        <p>All AXONO branding and website content is owned by AXONO or used under licence and may not be reused without permission.</p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to {site.contactEmail}.</p>
      </div>
    </LegalPage>
  );
}
