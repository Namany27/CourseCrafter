import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Crafter",
  description: "This helps you to create courses.",
  keywords: ["course crafter"],
  openGraph: {
    title: "Course Crafter",
    description: "This helps you to create courses.",
    url: "https://coursecrafter.vercel.app/",
    siteName: "Course Crafter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Course Crafter",
    description: "This helps you to create courses."
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-800 font-sans`}>
        {children}
      </body>
    </html>
  );
}