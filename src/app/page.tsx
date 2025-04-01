"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { redirectToSpotifyAuthorize } from "@/lib/spotify";
import { FaSpotify } from "react-icons/fa";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by looking for the access token cookie
    const accessToken = document.cookie.includes("spotify_access_token");
    setIsAuthenticated(accessToken);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="images/logo.png" alt="Mergify Logo" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-green-600">Mergify</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          {!isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => redirectToSpotifyAuthorize()}
            >
              Sign In <FaSpotify className="ml-2" size={15} />
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                Merge Playlists
              </Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Merge Your Spotify Playlists
          </h1>
          <p className="text-xl text-muted-foreground">
            Combine multiple playlists into one perfect mix with just a click.
          </p>

          <div className="relative w-full max-w-2xl mx-auto my-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25"></div>
            <div className="relative bg-card rounded-lg shadow-xl overflow-hidden border border-border">
              <div className="p-6">
                <div className="space-y-4">
                  {/* Example Playlist Items */}
                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                    <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
                      <img src="/images/uk.png" alt="UK Chill Mix Playlist" className="object-cover h-full w-full rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">UK Chill Mix</h3>
                      <p className="text-sm text-muted-foreground">32 tracks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                    <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
                      <img src="/images/gym.png" alt="Gym Workout Playlist" className="object-cover h-full w-full rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Gym Workout</h3>
                      <p className="text-sm text-muted-foreground">45 tracks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                    <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
                      <img src="/images/jazz.png" alt="Late Nite Jazz Playlist" className="object-cover h-full w-full rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Late Nite Jazz</h3>
                      <p className="text-sm text-muted-foreground">28 tracks</p>
                    </div>
                  </div>

                  {/* Animated "Now Playing" Section */}
                  <div className="mt-6 flex items-center justify-center gap-2 p-1">
                    <span className="text-sm font-medium text-green-600">Now Playing:</span>

                    {/* Animated Bars */}
                    <motion.div
                      initial={{ scaleY: 0.2 }}
                      animate={{ scaleY: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                      style={{ originY: "bottom" }}
                      className="w-[4px] h-[20px] bg-green-500 rounded"
                    />
                    <motion.div
                      initial={{ scaleY: 0.5 }}
                      animate={{ scaleY: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                      style={{ originY: "bottom" }}
                      className="w-[4px] h-[20px] bg-green-500 rounded"
                    />
                    <motion.div
                      initial={{ scaleY: 0.8 }}
                      animate={{ scaleY: [0.8, 1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.4 }}
                      style={{ originY: "bottom" }}
                      className="w-[4px] h-[20px] bg-green-500 rounded"
                    />

                    {/* Track Name */}
                    <span className="ml-2 text-sm font-medium text-muted-foreground">Chill Jazz Workout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => redirectToSpotifyAuthorize()}
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
          )}
          <p className="text-muted-foreground text-sm">
            For more info see the <Link href="/about" className="underline">About</Link> page
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
