import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css'
import Spotify from '../Spotify';


function App () {
  const songs = [
    { id: 1, name: "Bohemian Rhapsody", author: "Queen", duration: "4:56", uri: "spotify:track:7tFiyTwD0nx5a1eklYtX2J" },
    { id: 2, name: "Hotel California", author: "Eagles", duration: "6:31", uri: "spotify:track:40riOy7x9W7GXjyGp4pjAv" },
    { id: 3, name: "Billie Jean", author: "Michael Jackson", duration: "4:54",uri: "spotify:track:3S2R0EVwBSAVMd5UMgKTL0" },
    { id: 4, name: "Smells Like Teen Spirit", author: "Nirvana", duration: "5:01", uri: "spotify:track:am,fnfajhSJFHDZ8833akjsdkjhasfdas8" }
];
  const [filteredResults, setFilteredResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  
  const savePlaylist = () => {
    if (playlist.length === 0) return;

    const accessToken = Spotify.getAccessToken();

    sessionStorage.setItem('SavedPlaylist', JSON.stringify(playlist));
    
    console.log('Spotify Token Obtained', accessToken);
    
    const trackURIs = playlist.map(track => track.uri);
    console.log(trackURIs)
    alert(`Saving ${playlistName} to Spotify: \n${trackURIs.join("\n")}`)
    setPlaylist([]);
    setPlaylistName('My Playlist')
  };

  const updatePlaylistName = name => {
    setPlaylistName(name)
  };

  const handleSearch = query => {
    if(!query) {
      setFilteredResults([]);
      return;
    }

    const filtered = songs.filter(song => 
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const addToPlaylist = song => {
    if(!playlist.some(item => item.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const removeFromPlaylist = song => {
    setPlaylist(playlist.filter(item => item.id !== song.id))
  };

  return (
    <div>
      <h1 className={styles.jammmingtitle}>Jammming</h1>
      <div
        className={styles.container}
      >
        <div
          className={styles.left}
        >
          
          <SearchBar onSearch={handleSearch} />
          <SearchResults results={filteredResults} onAdd={addToPlaylist}/>
        </div>
        <div
          className={styles.right}
        >
          <Playlist
            playlist={playlist}
            onRemove={removeFromPlaylist}
            className={styles.playlisttitle}
            playlistName={playlistName}
            setPlaylistName={updatePlaylistName}
            onSave={savePlaylist}
        />
        </div>
      </div>
    </div>
  )
}

export default App;