/**
 * Global site configuration.
 * ---------------------------------------------------------------
 * TODO(axono): replace the placeholder Instagram / LinkedIn URLs
 * below with AXONO's real profiles before launch.
 */
export const site = {
  name: "AXONO",
  tagline: "Play. Capture. Relive.",
  description:
    "AXONO brings automated match recording to sports venues. Play your game, scan the QR code at your court and watch or download your match — badminton, turf cricket, turf football, pickleball and padel.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://axonosports.vercel.app",
  contactEmail: "info@axonoiot.com",
  partnershipsEmail: "info@axonoiot.com",
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

/**
 * Three pages: Home, For Venues, Contact.
 * Sports / How It Works / About are sections on the home page.
 */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Sports", href: "/#sports" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "For Venues", href: "/venues" },
  { label: "Contact", href: "/contact" },
] as const;
