import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css'
import Spotify from '../Spotify';


function App () {

  const [filteredResults, setFilteredResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  
  const savePlaylist = async () => {
    if (playlist.length === 0) return;

    const trackURIs = playlist.map(track => track.uri);

      try {
        await Spotify.createPlaylist(playlistName, trackURIs);
        setPlaylist([]);
        setPlaylistName('My Playlist');
        alert(`${playlistName} successfuly saved on Spotify!`)
      } catch(error) {
        console.error('Error saving playlist:', error);
      };
  };

  const updatePlaylistName = name => {
    setPlaylistName(name)
  };

  const handleSearch = async (query) => {
    console.log('Searching for:', query);
    if(!query) {
      setFilteredResults([]);
      return;
    }

    const searchResults = await Spotify.search(query);
    setFilteredResults(searchResults);
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