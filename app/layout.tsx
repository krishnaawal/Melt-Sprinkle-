import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melt & Sprinkle — Make every snack worth sharing",
  description: "A rich, cheesy sprinkle for popcorn, fries, pasta and more. Order Himalaya Great Foods Cheese Powder Seasoning with Cash on Delivery in Nepal.",
  keywords: ["cheese powder", "popcorn seasoning", "Nepal", "cash on delivery"],
  openGraph: { title: "Melt & Sprinkle — Make every snack worth sharing", description: "Cheesy seasoning for your everyday snack rituals.", type: "website" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>; }
