import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mergify",
  description:
    "Combine multiple Spotify playlists into one perfect mix with just a few clicks.",
    openGraph: {
      title: "Mergify",
      description: "Combine multiple Spotify playlists into one perfect mix with just a few clicks.",
      url: "https://Mergify.marink.me", // Replace with your website URL
      siteName: "Mergify",
      images: [
        {
          url: "/images/banner.png", // Path to your Open Graph image
          width: 1200,
          height: 630,
          alt: "Mergify - Combine Spotify Playlists",
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
          <ToastContainer position="top-right" autoClose={2000} />
          <TempoInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
