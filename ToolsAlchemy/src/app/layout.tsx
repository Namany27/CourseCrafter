import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tool Alchemy",
  description: "A website which will help you with its everyday ai tools",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
  {/* Google Site Verification */}
  <meta
    name="google-site-verification"
    content="rwGtnzGXuR2vjQUN2ZKigcGJng1A4z6-Qb8c_C6lVfo"
  />

  {/* Google Analytics */}
  <Script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-E0G1BWRJT3"
    strategy="afterInteractive"
  />
  <Script
    id="google-analytics"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E0G1BWRJT3');
      `,
    }}
  />

  {/* Buy Me a Coffee Widget */}
  <Script
    data-name="BMC-Widget"
    data-cfasync="false"
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    data-id="ToolAlchemy"
    data-description="Support me on Buy me a coffee!"
    data-message="Love the tools? Support the magic behind ToolAlchemy by buying me a coffee! Every cup fuels more features, faster updates, and awesome new tools. Thanks for keeping the alchemy alive!"
    data-color="#5F7FFF"
    data-position="Right"
    data-x-margin="18"
    data-y-margin="18"
    strategy="afterInteractive"
  />
</head>
      <body className="bg-gray-50 text-gray-800 font-sans">{children}</body>
    </html>
  );
}