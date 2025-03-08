import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Error handling
  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString("base64")}`,
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        }).toString(),
      },
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange error:", error);
      return NextResponse.redirect(
        new URL("/?error=token_exchange", request.url),
      );
    }

    const tokenData = await tokenResponse.json();

    // Get user profile
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error("User profile fetch error");
      return NextResponse.redirect(
        new URL("/?error=user_profile", request.url),
      );
    }

    const userData = await userResponse.json();

    // Set cookies with token information
    const redirectUrl = new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL);
    const response = NextResponse.redirect(redirectUrl);

    // Set access token cookie - make it accessible to JavaScript
    response.cookies.set({
      name: "spotify_access_token",
      value: tokenData.access_token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    });

    response.cookies.set({
      name: "spotify_refresh_token",
      value: tokenData.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // Set a non-HTTP-only cookie with basic user info for client-side
    response.cookies.set({
      name: "spotify_user",
      value: JSON.stringify({
        id: userData.id,
        name: userData.display_name,
        email: userData.email,
        image: userData.images?.[0]?.url,
      }),
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(new URL("/?error=server_error", request.url));
  }
}
