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
    const trackUris = new Map<string, { count: number; track: any }>();

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
            }
          }
        }
        offset += limit;
      } while (tracksData.next); // Continue fetching if there are more tracks
    }

    // Create a new playlist
    const playlistName = name || "Merged Playlist";
    const playlistDescription = description || "Created with Mergify";

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

    // Add tracks to the new playlist based on duplicate removal option
    const uris = Array.from(trackUris.entries()).flatMap(([uri, { count }]) => {
      if (removeDuplicates) {
        return [uri];
      } else {
        return Array(count).fill(uri);
      }
    });

    // Add tracks in batches of 100 as per Spotify API limits
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
        images: newPlaylist.images,
      },
    });
  } catch (error) {
    console.error("Merge error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
