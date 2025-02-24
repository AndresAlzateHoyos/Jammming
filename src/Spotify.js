const clientId = "173f220ad8b0488ba4aeb96322d545de";
const redirectUri = "http://localhost:5173/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const storedToken = sessionStorage.getItem('spotifyAccessToken');
    if(storedToken) {
        accessToken = storedToken;
        return accessToken;
    };



    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);

      sessionStorage.setItem('spotifyAccessToken', accessToken);


      window.setTimeout(() => {
        accessToken = "";
        sessionStorage.removeItem('spotifyAccessToken');
          }, expiresIn * 1000);

      window.history.pushState("Access Token", null, "/");
    
      return accessToken;
    } else {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authUrl; 
    }
  },

  async createPlaylist(playlistName, trackURIs) {
    const accessToken = this.getAccessToken();
    if (!accessToken) return;

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-type' : 'application/json'
    };

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers
    });

    if (!response.ok) {
        console.error('Error getting user ID:', response.statusText);
        return;
    }
    
    const userData = await response.json();
    const userId = userData.id;
  }

};

export default Spotify;