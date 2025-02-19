import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


function App () {
  const songs = ['I love you', 'Your name is', 'Beetlejuice', 'Paula Arango', 'Baby Come Back', 'Kimi Ma No Wa', 'Taxi Driver', 'This is the Lolcow Story'];
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = query => {
    if(!query) {
      setFilteredResults([]);
      return;
    }
    const filtered = songs.filter(song => 
      song.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  }

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={filteredResults} />
    </div>
  )
}

export default App;