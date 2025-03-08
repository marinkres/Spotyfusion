// Spotify API configuration
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

// Scopes required for the application
const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-private",
];

/**
 * Generates a random string for state verification
 */
export const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Redirects the user to the Spotify authorization page
 */
export const redirectToSpotifyAuthorize = () => {
  if (!CLIENT_ID) {
    console.error("Spotify Client ID not configured", CLIENT_ID);
    alert(
      "Spotify Client ID not configured. Please check your environment variables.",
    );
    return;
  }

  const state = generateRandomString(16);
  localStorage.setItem("spotify_auth_state", state);

  const args = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: REDIRECT_URI,
    state: state,
  });

  console.log("Redirecting to Spotify with:", {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: SCOPES.join(" "),
    state: state,
  });

  window.location.href = "https://accounts.spotify.com/authorize?" + args;
};

/**
 * Fetches user's playlists from Spotify
 */
export const getUserPlaylists = async (accessToken: string) => {
  console.log(
    "Fetching playlists with token:",
    accessToken.substring(0, 10) + "...",
  );

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API error:", response.status, errorText);
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Playlists data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getUserPlaylists:", error);
    throw error;
  }
};

/**
 * Fetches tracks from a playlist
 */
export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.json();
};

/**
 * Creates a new playlist
 */
export const createPlaylist = async (
  accessToken: string,
  userId: string,
  name: string,
  description: string = "",
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        public: false,
      }),
    },
  );

  return response.json();
};

/**
 * Adds tracks to a playlist
 */
export const addTracksToPlaylist = async (
  accessToken: string,
  playlistId: string,
  uris: string[],
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris,
      }),
    },
  );

  return response.json();
};
