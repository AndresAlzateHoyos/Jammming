const clientId = "173f220ad8b0488ba4aeb96322d545de";
const redirectUri = "http://localhost:5173/";
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-library-modify&redirect_uri=${redirectUri}`;
let accessToken;

function formatDuration (durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ""}${seconds}`;
}

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log('Using stored access token:', accessToken);
      return accessToken;
    }

    const storedToken = sessionStorage.getItem('spotifyAccessToken');
    if (storedToken) {
      accessToken = storedToken;
      console.log('Using session storage token:', accessToken);
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);

      sessionStorage.setItem('spotifyAccessToken', accessToken);
      console.log('New access token obtained:', accessToken);

      // ✅ Asegura que solo se elimine si sigue siendo el mismo token antes de borrarlo
      const currentAccessToken = accessToken;
      window.setTimeout(() => {
        if (sessionStorage.getItem('spotifyAccessToken') === currentAccessToken) {
          console.warn('Access token expired, requesting a new one...');
          accessToken = "";
          sessionStorage.removeItem('spotifyAccessToken');
          window.location.href = authUrl;
        }
      }, expiresIn * 1000);

      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } 
    
    console.warn('Redirecting to Spotify login...');
    window.location.href = authUrl; // ✅ Redirige solo si no hay token
  },

  async search(query) {
    let accessToken = this.getAccessToken();
    if (!accessToken) {
      console.error('No access token available');
      return [];
    }

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;

    console.log('Fetching from:', endpoint);
    console.log('Using token:', accessToken);

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      });

      if (response.status === 401) {
        console.warn("Token expired! Requesting new token...");
        sessionStorage.removeItem('spotifyAccessToken');
        accessToken = "";
        window.location.href = authUrl; // ✅ Usa authUrl correctamente
        return [];
      }

      if (!response.ok) {
        console.error('Error fetching data:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      console.log('Spotify API response:', data);

      if (!data.tracks) {
        console.error('No tracks found');
        return [];
      }

      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: formatDuration(track.duration_ms),
        uri: track.uri
      }));
    } catch (error) {
      console.error('Error fetching tracks:', error);
      return [];
    }
  },

  async createPlaylist(playlistName, trackURIs) {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      console.error('No access token available');
      return;
    }

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-type' : 'application/json'
    };

    try {
      const userResponse = await fetch('https://api.spotify.com/v1/me', {headers});
      if(!userResponse.ok) throw new Error('Failed to fetch user ID');

      const userData = await userResponse.json();
      const userId = userData.id;

      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: playlistName,
            description: 'Playlist created using Jammming',
            public: false
        })
      });

      if(!playlistResponse.ok) throw new Error('Failed to create playlist');

      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers,
        body:JSON.stringify({ uris: trackURIs })
      });

      if (!addTracksResponse.ok) throw new Error('Failed to add tracks to playlist');

      console.log(`Playlist "${playlistName}" successfuly created and songs added to it!`);
    } catch (error) {
        console.error('Error in createPlaylist:', error);
    }
  }
};

export default Spotify;