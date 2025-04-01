"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Footer from "@/components/footer";
import { PlaylistCard } from "@/components/playlist-card";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [mergedPlaylist, setMergedPlaylist] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("spotify_user="));

    if (userCookie) {
      try {
        const userJson = decodeURIComponent(userCookie.split("=")[1]);
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }

    // Get playlist data from URL parameters
    const playlistData = searchParams.get("playlist");
    if (playlistData) {
      try {
        setMergedPlaylist(JSON.parse(decodeURIComponent(playlistData)));
      } catch (error) {
        console.error("Error parsing playlist data", error);
        router.push("/dashboard");
      }
    } else {
      router.push("/dashboard");
    }
  }, [router, searchParams]);

  if (!mergedPlaylist) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-xl font-bold">
            <div className="h-8 w-8 rounded-full flex items-center justify-center">
              <img src="images/logo.png" alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-green-500">
              Playlist Created Successfully!
            </h1>
            <p className="text-muted-foreground">
              Your new playlist is ready to enjoy
            </p>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your New Playlist</h2>
              <span className="text-sm text-muted-foreground">
                {mergedPlaylist.trackCount} tracks
              </span>
            </div>
            <PlaylistCard
              playlist={mergedPlaylist}
              variant="success"
              showTrackCount={false}
            />
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="border-green-500 bg-green-500 text-white hover:bg-green-600"
              onClick={() => window.open(mergedPlaylist.url, "_blank")}
            >
              Open in Spotify
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Create Another Playlist
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
} 