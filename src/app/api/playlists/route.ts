import { NextRequest, NextResponse } from "next/server";
import { getUserPlaylists } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;
  const userCookie = request.cookies.get("spotify_user")?.value;

  if (!accessToken || !userCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const playlistsData = await getUserPlaylists(accessToken);
    
    return NextResponse.json({
      success: true,
      playlists: playlistsData.items,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 