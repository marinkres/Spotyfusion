"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="/images/logo.png" alt="SpotyMerge Logo" />
          </div>
          <Link href="/">
            <h1 className="text-xl font-bold">
              <span className="text-green-600"></span>Mergify
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <section className="max-w-4xl mx-auto space-y-12 text-center">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              About Mergify
            </h1>
            <p className="text-lg text-muted-foreground">
              Mergify is your ultimate tool for combining Spotify playlists effortlessly. Whether you're creating a party mix or organizing your music library, SpotyMerge simplifies the process with just a few clicks.
            </p>
            <p className="text-gray-500 text-xs">*This project is not associated, tie-in, co-branding or promotion by Spotify.</p>
          </div>

          {/* Features Section */}
          <section className="space-y-8">
            
          <div className="p-6 bg-secondary rounded-3xl shadow-md space-y-4">
            <h2 className="text-3xl font-bold text-left">Why Mergify?</h2>
            <ul className="space-y-4 text-left list-disc list-inside">
              <li>
                Combine Playlists: Merge multiple Spotify playlists into one without duplicates.
              </li>
              <li>
                Duplicate Removal: Automatically removes duplicate tracks during the merge process.
              </li>
              <li>
                User-Friendly: Clean and intuitive interface for seamless interaction.
              </li>
              <li>
                Secure Authentication: Your data is safe with Spotify's secure OAuth system.
              </li>
              <li>
                Cross-Device Support: Use Mergify on desktop or mobile devices.
              </li>
            </ul>
            </div>
          </section>

          {/* Guide Section */}
          <section className="space-y-8 text-left">
          <div className="p-6 bg-secondary rounded-3xl shadow-md space-y-4">

            <h2 className="text-3xl font-bold">How to Use Mergify</h2>

            {/* Step-by-Step Guide */}
            <ol className="space-y-6 list-decimal list-inside">
              <li>
                Sign In with Spotify:
                Click the "Sign In" button on the homepage to authenticate your Spotify account securely.
              </li>

              <li>
                Select Playlists:
                Choose the playlists you want to merge from your Spotify library. You can select as many as you like!
              </li>

              <li>
                Customize Your Playlist:
                Name your new playlist and optionally add a description. Mergify will handle duplicate removal automatically.
              </li>

              <li>
                Save and Enjoy:
                Once merged, your new playlist will appear in your Spotify account. Open Spotify and start listening!
              </li>
            </ol>
            </div>
            {/* Pro Tips */}
          </section>

          {/* Call-to-Action Section */}
          <section className="space-y-4 text-center">
            <h2 className="text-xl font-bold">Ready to Get Started?</h2>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              asChild
            >
              <Link href="/">Start Merging Playlists</Link>
            </Button>
          </section>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Mergify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Github
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
