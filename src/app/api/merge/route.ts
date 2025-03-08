import { NextRequest, NextResponse } from "next/server";
import {
  createPlaylist,
  getPlaylistTracks,
  addTracksToPlaylist,
} from "@/lib/spotify";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;
  const userCookie = request.cookies.get("spotify_user")?.value;

  if (!accessToken || !userCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const {
      playlistIds,
      name,
      description,
      removeDuplicates,
      deleteAfterMerge,
    } = await request.json();
    const userData = JSON.parse(userCookie);
    const userId = userData.id;

    if (!playlistIds || !Array.isArray(playlistIds) || playlistIds.length < 2) {
      return NextResponse.json(
        { error: "At least 2 playlist IDs are required" },
        { status: 400 },
      );
    }

    // Fetch tracks from all selected playlists
    const allTracks = [];
    const trackUris = new Set<string>();

    for (const playlistId of playlistIds) {
      const tracksData = await getPlaylistTracks(accessToken, playlistId);

      if (tracksData.items) {
        for (const item of tracksData.items) {
          if (item.track) {
            // If removing duplicates, check if we already have this track
            if (removeDuplicates) {
              if (!trackUris.has(item.track.uri)) {
                trackUris.add(item.track.uri);
                allTracks.push(item.track);
              }
            } else {
              allTracks.push(item.track);
              trackUris.add(item.track.uri);
            }
          }
        }
      }
    }

    // Create a new playlist
    const playlistName = name || "Merged Playlist";
    const playlistDescription = description || "Created with SpotyMerge";

    const newPlaylist = await createPlaylist(
      accessToken,
      userId,
      playlistName,
      playlistDescription,
    );

    if (!newPlaylist.id) {
      return NextResponse.json(
        { error: "Failed to create playlist" },
        { status: 500 },
      );
    }

    // Add tracks to the new playlist (in batches of 100 as per Spotify API limits)
    const uris = Array.from(trackUris);
    const batchSize = 100;

    for (let i = 0; i < uris.length; i += batchSize) {
      const batch = uris.slice(i, i + batchSize);
      await addTracksToPlaylist(accessToken, newPlaylist.id, batch);
    }

    return NextResponse.json({
      success: true,
      playlist: {
        id: newPlaylist.id,
        name: newPlaylist.name,
        url: newPlaylist.external_urls?.spotify,
        trackCount: uris.length,
      },
    });
  } catch (error) {
    console.error("Merge error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
