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
  title: "ToolAlchemy – Everyday AI Tools",
  description: "ToolAlchemy provides powerful AI tools to simplify daily tasks. Generate cover letters, summaries, and more with ease.",
  keywords: ["AI tools", "cover letter generator", "ToolAlchemy", "AI productivity", "free AI tools"],
  openGraph: {
    title: "ToolAlchemy – Everyday AI Tools",
    description: "Powerful free AI tools to help you with resumes, letters, and more.",
    url: "https://toolalchemy.vercel.app/",
    siteName: "ToolAlchemy",
    images: [
      {
        url: "https://www.toolalchemy.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolAlchemy Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolAlchemy",
    description: "Everyday AI tools to simplify your life.",
    images: ["https://www.toolalchemy.com/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>

<Script
  type="application/ld+json"
  id="structured-data"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ToolAlchemy",
      url: "https://www.toolalchemy.com",
      description: "ToolAlchemy provides AI tools to enhance your productivity.",
    }),
  }}
/>

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

  
</head>
      <body className="bg-gray-50 text-gray-800 font-sans">{children}
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
</body>
    </html>
  );
}