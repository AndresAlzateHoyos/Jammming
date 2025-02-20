import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';


function App () {
  const songs = [
    { id: 1, name: "Bohemian Rhapsody", author: "Queen", duration: "4:56" },
    { id: 2, name: "Hotel California", author: "Eagles", duration: "6:31" },
    { id: 3, name: "Billie Jean", author: "Michael Jackson", duration: "4:54" },
    { id: 4, name: "Smells Like Teen Spirit", author: "Nirvana", duration: "5:01" }
];
  const [filteredResults, setFilteredResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

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
  }

  const removeFromPlaylist = song => {
    setPlaylist(playlist.filter(item => item.id !== song.id))
  }

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={filteredResults} onAdd={addToPlaylist}/>
      <Playlist playlist={playlist} onRemove={removeFromPlaylist} />
    </div>
  )
}

export default App;