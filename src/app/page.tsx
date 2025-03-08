"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { redirectToSpotifyAuthorize } from "@/lib/spotify";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
  <svg
    version="1.1"
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16" // Adjusted width
    height="16" // Adjusted height
    viewBox="0 0 32 32"
    xmlSpace="preserve"
  >
    <style type="text/css">{`
      .sharpcorners_een { fill: #111918; }
      .st0 { fill: #111918; }
    `}</style>
    <path
      className="sharpcorners_een"
      d="M29,0v5.515c0,2.138-0.833,4.147-2.344,5.658l-7.484,7.484c-0.176,0.176-0.329,0.368-0.467,0.568
      c-0.357-1.384-1.041-2.661-2.014-3.744l7.138-7.138C24.584,7.588,25,6.583,25,5.515V0H29z M18,24.343v-2.858
      c0-2.138-0.833-4.147-2.344-5.657L8.172,8.342C7.416,7.588,7,6.583,7,5.515V0H3v5.515c0,2.138,0.833,4.147,2.344,5.657l7.484,7.486
      C13.584,19.412,14,20.417,14,21.485v2.858l-2.596-2.596l-2.828,2.828L16,32l7.425-7.425l-2.828-2.828L18,24.343z"
    />
  </svg>
  
</div>
<h1 className="text-xl font-bold underline"><span className="text-green-600">Spoty</span>Merge</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button
            variant="outline"
            size="sm"
            onClick={() => redirectToSpotifyAuthorize()}
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Merge Your Spotify Playlists
          </h1>
          <p className="text-xl text-muted-foreground">
            Combine multiple playlists into one perfect mix with just a few
            clicks.
          </p>

          <div className="relative w-full max-w-2xl mx-auto my-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25"></div>
            <div className="relative bg-card rounded-lg shadow-xl overflow-hidden border border-border">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                  <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
  <img 
    src="/images/uk.png" 
    alt="UK Chill Mix Playlist" 
    className="object-cover h-full w-full rounded"
  />
</div>

                    <div className="flex-1">
                      <h3 className="font-medium">UK Chill Mix</h3>
                      <p className="text-sm text-muted-foreground">32 tracks</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
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
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                  <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
                      <img 
                        src="/images/gym.png" 
                        alt="UK Chill Mix Playlist" 
                        className="object-cover h-full w-full rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Gym Workout</h3>
                      <p className="text-sm text-muted-foreground">45 tracks</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
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
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                  <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
  <img 
    src="/images/jazz.png" 
    alt="UK Chill Mix Playlist" 
    className="object-cover h-full w-full rounded"
  />
</div>

                    <div className="flex-1">
                      <h3 className="font-medium">Late Nite Jazz</h3>
                      <p className="text-sm text-muted-foreground">28 tracks</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
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
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>

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
            Connect with Spotify
          </Button>
        </div>
      </main>

      <footer className="container mx-auto py-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 SpotyMerge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
