/**
 * CONTACT FORM INTEGRATION POINT
 * ---------------------------------------------------------------
 * This is a frontend-only site. Form submissions are sent to the
 * endpoint in NEXT_PUBLIC_CONTACT_ENDPOINT as a JSON POST.
 *
 * To go live, pick any form/email service that accepts JSON, e.g.
 *   - Formspree:  NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/<form-id>
 *   - Getform, Basin, a Resend/SendGrid serverless function, etc.
 * Add the variable to `.env.local` (and your hosting provider) and rebuild.
 *
 * When the variable is NOT set, `submitContact` returns
 * `{ status: "not-configured" }` and the form tells the visitor so,
 * offering a pre-filled email instead. It never pretends a message was sent.
 */

export type ContactPayload = {
  enquiry: "player" | "venue" | "find-venue" | "other";
  name: string;
  email: string;
  phone?: string;
  venueName?: string;
  city?: string;
  sports?: string[];
  message: string;
};

export type SubmitResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

export const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  if (!CONTACT_ENDPOINT) return { status: "not-configured" };
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { status: "error", message: `The server responded with ${res.status}.` };
    return { status: "sent" };
  } catch {
    return { status: "error", message: "We couldn't reach the server. Please check your connection." };
  }
}

export const enquiryLabels: Record<ContactPayload["enquiry"], string> = {
  player: "I'm a player",
  "find-venue": "Find an Axono venue",
  venue: "Partner my venue",
  other: "Something else",
};

/** Builds a mailto: link carrying the form contents (fallback when no endpoint is configured). */
export function buildMailto(to: string, p: ContactPayload) {
  const subject = `AXONO enquiry — ${enquiryLabels[p.enquiry]}`;
  const lines = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.phone && `Phone: ${p.phone}`,
    p.venueName && `Venue: ${p.venueName}`,
    p.city && `City: ${p.city}`,
    p.sports?.length ? `Sports: ${p.sports.join(", ")}` : undefined,
    "",
    p.message,
  ].filter((l): l is string => typeof l === "string");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
