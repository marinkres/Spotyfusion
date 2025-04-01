"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserPlaylists } from "@/lib/spotify";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Footer from "@/components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MergeOptions } from "@/components/merge-options";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [analysis, setAnalysis] = useState<{
    totalTracks: number;
    uniqueTracks: number;
    duplicateCount: number;
    duplicateTracks: Array<{ name: string; artist: string; count: number }>;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const analyzeDuplicates = async (playlistIds: string[]) => {
    if (playlistIds.length < 2) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistIds }),
      });
      const data = await response.json();
      if (data.success) {
        setAnalysis(data.stats);
      }
    } catch (error) {
      console.error("Error analyzing duplicates:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const togglePlaylistSelection = async (playlistId: string) => {
    const newSelectedPlaylists = selectedPlaylists.includes(playlistId)
      ? selectedPlaylists.filter((id) => id !== playlistId)
      : [...selectedPlaylists, playlistId];
    
    setSelectedPlaylists(newSelectedPlaylists);
    await analyzeDuplicates(newSelectedPlaylists);
  };

   // State for handling logout modal visibility
   const [showLogoutModal, setShowLogoutModal] = useState(false);

   // Logout handler function
   const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout");
      if (response.ok) {
        toast.success("Logout successful!");
        router.push("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout.");
    }
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
          description: "Created with Mergify",
          removeDuplicates: removeDuplicates,
          deleteAfterMerge: deleteAfterMerge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to merge playlists");
      }

      // Redirect to success page with playlist data
      const playlistData = encodeURIComponent(JSON.stringify(data.playlist));
      router.push(`/success?playlist=${playlistData}`);
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
          
          <Link href="/dashboard" className="text-xl font-bold">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="images/logo.png"></img>  
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
          
          <Button variant="outline" size="sm" onClick={() => setShowLogoutModal(true)}>
            Sign Out
          </Button>

        </div>
      </header>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-md shadow-lg text-center max-w-sm w-full">
          <h3 className="font-semibold text-lg mb-4">Confirm Logout</h3>
          <p className="mb-6">Are you sure you want to log out?</p>
          <div className="flex gap-4 justify-center">
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Log Out
            </Button>
            <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      )}

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Select Playlists to Merge</h1>
            <p className="text-muted-foreground">
              Choose the playlists you want to combine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Playlists</h2>
                <span className="text-sm text-muted-foreground">
                  {selectedPlaylists.length} selected
                </span>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                        selectedPlaylists.includes(playlist.id)
                          ? "bg-green-500/20"
                          : "bg-secondary/50 hover:bg-secondary"
                      }`}
                      onClick={() => togglePlaylistSelection(playlist.id)}
                    >
                      <div className="h-12 w-12 rounded overflow-hidden flex items-center justify-center">
                        <img
                          src={playlist.images[0]?.url || "/images/default-playlist.png"}
                          alt={playlist.name}
                          className="object-cover h-full w-full rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{playlist.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {playlist.tracks.total} tracks
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <div className="space-y-6">
              {mergeSuccess ? (
                <Card className="p-6">
                  <div className="text-center space-y-4">
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
                          setAnalysis(null);
                        }}
                      >
                        Merge Another Playlist
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : selectedPlaylists.length >= 2 ? (
                <Card className="p-6 space-y-6 bg-card border shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Merge Options</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure how you want to merge your playlists
                        </p>
                      </div>
                    </div>

                    {isAnalyzing ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                      </div>
                    ) : analysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-secondary/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Tracks</p>
                            <p className="text-2xl font-bold">{analysis.totalTracks}</p>
                          </div>
                          <div className="p-4 bg-secondary/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Unique Tracks</p>
                            <p className="text-2xl font-bold">{analysis.uniqueTracks}</p>
                          </div>
                          <div className="p-4 bg-secondary/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Duplicate Tracks</p>
                            <p className="text-2xl font-bold">{analysis.duplicateCount}</p>
                          </div>
                        </div>

                        {analysis.duplicateTracks.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Duplicate Tracks:</h4>
                            <ScrollArea className="h-[200px] rounded-md border p-4">
                              <div className="space-y-2">
                                {analysis.duplicateTracks.map((track, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <div>
                                      <span className="font-medium">{track.name}</span>
                                      <span className="text-muted-foreground ml-2">
                                        by {track.artist}
                                      </span>
                                    </div>
                                    <span className="text-muted-foreground">
                                      {track.count}x
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="remove-duplicates"
                        checked={removeDuplicates}
                        onCheckedChange={setRemoveDuplicates}
                      />
                      <Label htmlFor="remove-duplicates" className="text-sm">
                        Remove duplicate tracks
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playlist-name" className="text-sm">
                        Playlist Name
                      </Label>
                      <input
                        id="playlist-name"
                        type="text"
                        value={mergedPlaylistName}
                        onChange={(e) => setMergedPlaylistName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                        placeholder="Enter playlist name"
                      />
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleMerge}
                      disabled={merging || isAnalyzing}
                    >
                      {merging ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Merging...
                        </>
                      ) : isAnalyzing ? (
                        "Analyzing duplicates..."
                      ) : (
                        `Merge ${selectedPlaylists.length} Playlists`
                      )}
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Select Playlists</h3>
                    <p className="text-muted-foreground">
                      {selectedPlaylists.length === 0
                        ? "Choose at least 2 playlists to merge"
                        : `Select ${2 - selectedPlaylists.length} more playlist${
                            2 - selectedPlaylists.length === 1 ? "" : "s"
                          } to merge`}
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
