import React, { useState } from 'react';
import styles from './SearchBar.module.css'

function SearchBar ({onSearch}) {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    }

    return (
        <form>
            <input
            className={styles.input}
            type='text'
            value={query}
            onChange={handleChange}
            placeholder='Search for a song...'
            ></input>
            <button className={styles.button}>Search</button>
        </form>
    )
};

export default SearchBar;