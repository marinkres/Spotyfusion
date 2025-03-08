import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("spotify_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Token refresh error:", error);
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: 401 },
      );
    }

    const data = await response.json();

    // Create response with new tokens
    const newResponse = NextResponse.json({ success: true });

    // Set new access token - make it accessible to JavaScript
    newResponse.cookies.set({
      name: "spotify_access_token",
      value: data.access_token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
    });

    // Set new refresh token if provided
    if (data.refresh_token) {
      newResponse.cookies.set({
        name: "spotify_refresh_token",
        value: data.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    return newResponse;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
