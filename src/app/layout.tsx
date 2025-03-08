import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPOTYMERGE",
  description:
    "Combine multiple Spotify playlists into one perfect mix with just a few clicks.",
    openGraph: {
      title: "SpotyMerge",
      description: "Combine multiple Spotify playlists into one perfect mix with just a few clicks.",
      url: "https://spotymerge.marink.me", // Replace with your website URL
      siteName: "SpotyMerge",
      images: [
        {
          url: "/images/banner.png", // Path to your Open Graph image
          width: 1200,
          height: 630,
          alt: "SpotyMerge - Combine Spotify Playlists",
        },
      ],
      locale: "en_US",
      type: "website",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <TempoInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
