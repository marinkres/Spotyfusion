"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserPlaylists } from "@/lib/spotify";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [mergedPlaylistName, setMergedPlaylistName] =
    useState("My Merged Playlist");
  const [merging, setMerging] = useState(false);
  const [mergeError, setMergeError] = useState("");
  const [mergeSuccess, setMergeSuccess] = useState<any>(null);
  const [displayCount, setDisplayCount] = useState(4);
  const [deleteAfterMerge, setDeleteAfterMerge] = useState(false);

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
        fetchPlaylists();
      } catch (error) {
        console.error("Error parsing user data", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchPlaylists = async () => {
    try {
      // Get access token from cookie
      const cookies = document.cookie.split("; ");
      console.log("All cookies:", cookies);

      const tokenCookie = cookies.find((row) =>
        row.startsWith("spotify_access_token="),
      );

      if (!tokenCookie) {
        console.error("No access token found in cookies");
        throw new Error("No access token found");
      }

      const token = decodeURIComponent(tokenCookie.split("=")[1]);
      console.log("Using token:", token.substring(0, 10) + "...");

      // Try to fetch playlists
      const data = await getUserPlaylists(token);
      console.log("Playlists response:", data);

      if (data && data.items) {
        console.log(`Found ${data.items.length} playlists`);
        setPlaylists(data.items);
      } else {
        console.error("Invalid playlist data format:", data);
        // Try refreshing token
        await refreshToken();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlists", error);
      setLoading(false);
      // Attempt to refresh token
      await refreshToken();
    }
  };

  const refreshToken = async () => {
    console.log("Attempting to refresh token...");
    try {
      const res = await fetch("/api/auth/refresh");
      if (res.ok) {
        console.log("Token refreshed successfully");
        // Wait a moment for cookies to be set
        setTimeout(() => {
          fetchPlaylists();
        }, 1000);
      } else {
        console.error("Failed to refresh token");
        router.push("/");
      }
    } catch (error) {
      console.error("Error refreshing token", error);
      router.push("/");
    }
  };

  const togglePlaylistSelection = (playlistId: string) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId],
    );
  };

  const handleLogout = () => {
    router.push("/api/auth/logout");
  };

  const handleMerge = async () => {
    setMerging(true);
    setMergeError("");
    setMergeSuccess(null);

    try {
      const response = await fetch("/api/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistIds: selectedPlaylists,
          name: mergedPlaylistName || "My Merged Playlist",
          description: "Created with Playlist Fusion",
          removeDuplicates: true,
          deleteAfterMerge: deleteAfterMerge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to merge playlists");
      }

      setMergeSuccess(data.playlist);
      // Clear selections after successful merge
      setSelectedPlaylists([]);
    } catch (error: any) {
      console.error("Merge error:", error);
      setMergeError(error.message || "Failed to merge playlists");
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
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
              className="text-white"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
          <Link href="/dashboard" className="text-xl font-bold">
            Playlist Fusion
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
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
          <p className="text-muted-foreground mb-8">
            Select the playlists you want to merge. You can choose multiple
            playlists to combine into a new one.
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {mergeSuccess ? (
                <div className="mt-8 p-6 bg-green-500/10 border border-green-500 rounded-md text-center max-w-md mx-auto">
                  <h3 className="font-medium text-green-500 mb-2 text-xl">
                    Playlist Created Successfully!
                  </h3>
                  <p className="text-md mb-6">
                    Your new playlist "{mergeSuccess.name}" with{" "}
                    {mergeSuccess.trackCount} tracks is ready.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="border-green-500 bg-green-500 text-white hover:bg-green-600"
                      onClick={() => window.open(mergeSuccess.url, "_blank")}
                    >
                      Open in Spotify
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMergeSuccess(null);
                        setSelectedPlaylists([]);
                        setMergedPlaylistName("My Merged Playlist");
                      }}
                    >
                      Merge Another Playlist
                    </Button>
                  </div>
                </div>
              ) : playlists.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playlists.slice(0, displayCount).map((playlist) => (
                      <div
                        key={playlist.id}
                        className={`flex items-center gap-3 p-4 rounded-md border ${
                          selectedPlaylists.includes(playlist.id)
                            ? "border-green-500 bg-green-500/10"
                            : "border-border bg-card"
                        } cursor-pointer transition-colors`}
                        onClick={() => togglePlaylistSelection(playlist.id)}
                      >
                        <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
                          {playlist.images?.[0]?.url ? (
                            <img
                              src={playlist.images[0].url}
                              alt={playlist.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-secondary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                              >
                                <path d="M9 18V5l12-2v13"></path>
                                <circle cx="6" cy="18" r="3"></circle>
                                <circle cx="18" cy="16" r="3"></circle>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium truncate">
                            {playlist.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {playlist.tracks.total} tracks
                          </p>
                        </div>
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            selectedPlaylists.includes(playlist.id)
                              ? "bg-green-500 text-white"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {selectedPlaylists.includes(playlist.id) ? (
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
                          ) : (
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
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {displayCount < playlists.length && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setDisplayCount((prev) => prev + 4)}
                      >
                        Load More
                      </Button>
                    </div>
                  )}

                  <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="w-full max-w-md">
                      <input
                        type="text"
                        placeholder="Name your merged playlist"
                        className="w-full p-2 rounded-md border border-border bg-background"
                        onChange={(e) => setMergedPlaylistName(e.target.value)}
                        value={mergedPlaylistName}
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full max-w-md">
                      <input
                        type="checkbox"
                        id="deleteAfterMerge"
                        checked={deleteAfterMerge}
                        onChange={(e) => setDeleteAfterMerge(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="deleteAfterMerge" className="text-sm">
                        Delete original playlists after merge
                      </label>
                    </div>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                      disabled={selectedPlaylists.length < 2 || merging}
                      onClick={handleMerge}
                    >
                      {merging ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Merging...
                        </>
                      ) : selectedPlaylists.length < 2 ? (
                        "Select at least 2 playlists"
                      ) : (
                        `Merge ${selectedPlaylists.length} Playlists`
                      )}
                    </Button>
                    {mergeError && (
                      <p className="text-sm text-red-500 mt-2">{mergeError}</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto text-muted-foreground mb-4"
                  >
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <h3 className="text-xl font-medium mb-2">
                    No playlists found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any playlists in your Spotify account yet.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open("https://open.spotify.com", "_blank")
                    }
                  >
                    Create a playlist on Spotify
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="container mx-auto py-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Playlist Fusion. All rights reserved.
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
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
