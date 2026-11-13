import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AXONO — Your Game. Your Moment. Your Replay.",
    template: "%s | AXONO",
  },
  description: site.description,
  keywords: [
    "match recording",
    "sports video recording",
    "badminton recording",
    "turf cricket recording",
    "turf football recording",
    "pickleball recording",
    "padel recording",
    "QR match replay",
    "sports venue technology",
  ],
  openGraph: {
    type: "website",
    siteName: "AXONO",
    title: "AXONO — Your Game. Your Moment. Your Replay.",
    description: site.description,
    images: [{ url: "/media/in/images/cricket-1.jpg", width: 1920, height: 1280, alt: "AXONO match recording" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXONO — Your Game. Your Moment. Your Replay.",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
