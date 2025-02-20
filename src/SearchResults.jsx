import React, { useState } from 'react';

function SearchResults({results, onAdd}) {
    if(results.length === 0) return null;
    return (
        <ul >
        {results.map((song) => (
            <li key={song.id}>
                <span>{song.name} - {song.author}</span>
                <button onClick={() => onAdd(song)}>+</button>
            </li>
        ))}
        </ul>
    )
    };

    export default SearchResults;