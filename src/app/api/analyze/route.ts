import { NextRequest, NextResponse } from "next/server";
import { getPlaylistTracks } from "@/lib/spotify";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;
  const userCookie = request.cookies.get("spotify_user")?.value;

  if (!accessToken || !userCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { playlistIds } = await request.json();

    if (!playlistIds || !Array.isArray(playlistIds) || playlistIds.length < 2) {
      return NextResponse.json(
        { error: "At least 2 playlist IDs are required" },
        { status: 400 },
      );
    }

    // Fetch tracks from all selected playlists
    const allTracks = [];
    const trackUris = new Map<string, { count: number; track: any }>();
    const trackNames = new Map<string, string>();
    const trackArtists = new Map<string, string>();

    for (const playlistId of playlistIds) {
      let tracksData;
      let offset = 0;
      const limit = 100;

      do {
        tracksData = await getPlaylistTracks(accessToken, playlistId, limit, offset);
        if (tracksData.items) {
          for (const item of tracksData.items) {
            if (item.track) {
              const uri = item.track.uri;
              if (trackUris.has(uri)) {
                trackUris.get(uri)!.count++;
              } else {
                trackUris.set(uri, { count: 1, track: item.track });
              }
              trackNames.set(uri, item.track.name);
              trackArtists.set(uri, item.track.artists[0].name);
            }
          }
        }
        offset += limit;
      } while (tracksData.next); // Continue fetching if there are more tracks
    }

    // Calculate statistics
    const trackValues = Array.from(trackUris.values());
    const totalTracks = trackValues.reduce((sum, { count }) => sum + count, 0);
    const uniqueTracks = trackValues.filter(({ count }) => count === 1).length;
    const duplicateTracks = trackValues.filter(({ count }) => count > 1);
    const duplicateCount = duplicateTracks.length;

    // Sort duplicate tracks by count (most duplicates first)
    duplicateTracks.sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      stats: {
        totalTracks,
        uniqueTracks,
        duplicateCount,
        duplicateTracks: duplicateTracks.map(({ track, count }) => ({
          name: track.name,
          artist: track.artists[0].name,
          count,
        })),
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 