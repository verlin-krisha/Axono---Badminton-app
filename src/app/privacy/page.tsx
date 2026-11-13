import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 2026">
      <div>
        <h2>Who we are</h2>
        <p>AXONO provides automated match recording at participating sports venues. This policy explains how we handle personal information.</p>
      </div>
      <div>
        <h2>Match recordings</h2>
        <p>Cameras at participating venues record games played on Axono-enabled courts and playing areas. Recordings are made available to players through the QR code at the playing area. Venues display information about recording on site.</p>
      </div>
      <div>
        <h2>Information you send us</h2>
        <p>If you contact us, we use the details you provide (such as your name, email address and message) only to respond to your enquiry.</p>
      </div>
      <div>
        <h2>Your rights</h2>
        <p>You can ask us about the personal information we hold about you, or ask us to correct or delete it, by emailing {site.contactEmail}.</p>
      </div>
    </LegalPage>
  );
}
