"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            Mergify
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">About Mergify</h1>
            <p className="text-muted-foreground">
              Your smart solution for merging Spotify playlists
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">What is Mergify?</h2>
              <p className="text-muted-foreground">
                Mergify is a powerful tool that helps you combine multiple Spotify playlists into one. Whether you're organizing your music collection or creating the perfect playlist for your next party, Mergify makes it easy to merge your playlists while maintaining control over duplicates and playlist organization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Duplicate Detection</h3>
                    <p className="text-muted-foreground">
                      Automatically identify and manage duplicate tracks across your playlists. Choose whether to keep or remove duplicates with a simple toggle.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Detailed Analysis</h3>
                    <p className="text-muted-foreground">
                      Get comprehensive insights into your playlists before merging, including total tracks, unique tracks, and detailed duplicate information.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Custom Playlist Naming</h3>
                    <p className="text-muted-foreground">
                      Give your merged playlist a custom name that reflects its content and purpose.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">User-Friendly Interface</h3>
                    <p className="text-muted-foreground">
                      Navigate through your playlists with ease using our paginated interface. Select multiple playlists and see real-time analysis of your selection.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="space-y-8">
                {/* Step 1: Connect */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-semibold">1</span>
                    </div>
                    <h3 className="font-medium">Connect your Spotify account</h3>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center">
                        <img src="/images/logo.png" alt="Mergify Logo" className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Click the "Connect with Spotify" button to securely link your account</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Browse */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-semibold">2</span>
                    </div>
                    <h3 className="font-medium">Browse and select playlists</h3>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                        <div className="h-12 w-12 rounded bg-secondary/50 overflow-hidden">
                          <img src="/images/jazz.png" alt="Example Playlist" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Chill Vibes</h4>
                          <p className="text-sm text-muted-foreground">25 tracks</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-md bg-green-500/20">
                        <div className="h-12 w-12 rounded bg-secondary/50 overflow-hidden">
                          <img src="/images/gym.png" alt="Selected Playlist" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Workout Beats</h4>
                          <p className="text-sm text-muted-foreground">40 tracks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Analyze */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-semibold">3</span>
                    </div>
                    <h3 className="font-medium">Review playlist analysis</h3>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-md bg-secondary/50 text-center">
                          <p className="text-sm text-muted-foreground">Total Tracks</p>
                          <p className="text-lg font-semibold">65</p>
                        </div>
                        <div className="p-3 rounded-md bg-secondary/50 text-center">
                          <p className="text-sm text-muted-foreground">Unique Tracks</p>
                          <p className="text-lg font-semibold">58</p>
                        </div>
                        <div className="p-3 rounded-md bg-secondary/50 text-center">
                          <p className="text-sm text-muted-foreground">Duplicates</p>
                          <p className="text-lg font-semibold">7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Configure */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-semibold">4</span>
                    </div>
                    <h3 className="font-medium">Configure merge options</h3>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Playlist Name</h4>
                          <p className="text-sm text-muted-foreground">My Ultimate Mix</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Remove duplicates</span>
                          <div className="h-6 w-11 rounded-full bg-green-500 flex items-center justify-end px-1">
                            <div className="h-4 w-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Create */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-semibold">5</span>
                    </div>
                    <h3 className="font-medium">Create and enjoy your playlist</h3>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
                        <img src="/images/uk.png" alt="Merged Playlist" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">My Ultimate Mix</h4>
                        <p className="text-sm text-muted-foreground">58 tracks</p>
                      </div>
                      <Button variant="outline" size="sm" className="cursor-not-allowed pointer-events-none opacity-50">
                        Open in Spotify
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">
                Ready to merge your playlists? Connect your Spotify account and start creating the perfect playlist combinations.
              </p>
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Start Merging
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
