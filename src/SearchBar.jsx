import React, { useState } from 'react';

function SearchBar ({onSearch}) {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    }

    return (
        <form>
            <input
            type='text'
            value={query}
            onChange={handleChange}
            placeholder='Search for a song...'
            ></input>
        </form>
    )
};

export default SearchBar