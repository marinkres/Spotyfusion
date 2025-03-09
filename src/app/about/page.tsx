"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { FaSpotify } from "react-icons/fa";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="/images/logo.png" alt="Mergify Logo" />
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
              Mergify is your ultimate tool for combining Spotify playlists effortlessly. Whether you're creating a party mix or organizing your music library, Mergify simplifies the process with just a few clicks.
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
          <div className="p-6 border-2 border-green-600 rounded-3xl shadow-md space-y-4">
            <h2 className="text-3xl font-bold">How to Use Mergify</h2>

            {/* Step-by-Step Guide */}
            <div className="space-y-4">
            <p className="font-bold">1. Sign In with Spotify:</p>
            <p className="text-gray-400">
                Click the "Sign In" button on the homepage to authenticate your Spotify account securely.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                variant="outline"
                size="sm"
                className="cursor-not-allowed pointer-events-none w-full sm:w-auto"
                >
                Sign In
                </Button>
                <p className="text-gray-400 font-medium">or</p>
                <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white cursor-not-allowed pointer-events-none w-full sm:w-auto"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                </svg>
                Connect with Spotify <FaSpotify className="ml-2" size={20} />
                </Button>
            </div>
            </div>


            <div className="space-y-6">
            {/* Explanation */}
            <p className="font-bold">2. Select playlists:</p>
            <p className="text-muted-foreground mb-4">
                To select playlists, click on the playlist cards displayed below. Selected playlists will be highlighted with a green border, indicating they are ready to be merged. You can choose multiple playlists by clicking on them. If you change your mind, simply click again to deselect a playlist.
            </p>

            {/* Visual Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Example Playlist Card - Unselected */}
                <div className="flex items-center gap-3 p-4 rounded-md border border-border bg-card">
                <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
                    <img
                    src="/images/jazz.png"
                    alt="Example Playlist"
                    className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium truncate">Chill Vibes</h3>
                    <p className="text-sm text-muted-foreground">25 tracks</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                    </svg>
                </div>
                </div>

                {/* Example Playlist Card - Selected */}
                <div className="flex items-center gap-3 p-4 rounded-md border border-green-500 bg-green-500/10">
                <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
                    <img
                    src="/images/gym.png"
                    alt="Example Playlist Selected"
                    className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium truncate">Workout Beats</h3>
                    <p className="text-sm text-muted-foreground">40 tracks</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                </div>
            </div>
            </div>


            <div className="space-y-6">
            {/* Customize Your Playlist */}
            <div>
                <p className="font-bold mb-4">
                3. Customize Your Playlist:</p>    
                <p className="text-muted-foreground mb-4">Name your new playlist and optionally add a description. Mergify will handle duplicate removal automatically.</p>
              
                {/* Visual Example */}
                <div className="p-4 rounded-md border border-border bg-card space-y-4">
                <input
                    type="text"
                    placeholder="Enter playlist name"
                    className="w-full p-2 rounded-md border border-gray-300 cursor-not-allowed pointer-events-none"
                />
                <textarea
                    placeholder="Add a description (optional)"
                    className="w-full p-2 rounded-md border border-gray-300 cursor-not-allowed pointer-events-none"
                ></textarea>
                <p className="text-sm text-muted-foreground">
                    Example: "My Ultimate Party Mix" - A playlist for all your favorite tracks!
                </p>
                </div>
            </div>

            {/* Save and Enjoy */}
            <div>
                <p className="font-bold mb-4">
                3. Save and Enjoy:</p>    
                <p className="text-muted-foreground mb-4">Once merged, your new playlist will appear in your Spotify account. Open Spotify and start listening!</p>
                {/* Visual Example */}
                <div className="flex items-center gap-3 p-4 rounded-md border border-green-500 bg-green-500/10">
                <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
                    <img
                    src="/images/uk.png"
                    alt="Example Saved Playlist"
                    className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium truncate">My Ultimate Party Mix</h3>
                    <p className="text-sm text-muted-foreground">65 tracks</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                </div>
            </div>
            </div>




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
