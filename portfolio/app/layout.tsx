import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Waleed Ilyas | Full Stack Engineer (MERN, Next.js, Solana)",
  description: "Full stack engineer with 3+ years building MERN, Next.js and Solana products. Open to remote roles worldwide.",
  keywords: ["Waleed Ilyas", "Full Stack Engineer", "MERN", "Next.js", "Solana", "Pakistan developer", "remote software engineer"],
  authors: [{ name: "Waleed Ilyas" }],
  openGraph: {
    type: "website",
    title: "Waleed Ilyas | Full Stack Engineer",
    description: "MERN, Next.js and Solana products built end to end from schema to deployment.",
    url: siteUrl,
    siteName: "Waleed Ilyas Portfolio",
    images: [
      {
        url: "/images/profile/waleed-og.jpg",
        width: 1200,
        height: 630,
        alt: "Waleed Ilyas portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed Ilyas | Full Stack Engineer",
    description: "MERN, Next.js and Solana products built end to end from schema to deployment.",
    images: ["/images/profile/waleed-og.jpg"],
  },
};
export const viewport: Viewport = { themeColor: "#07080c", width: "device-width", initialScale: 1 };

const themeInit = "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
