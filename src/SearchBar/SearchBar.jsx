import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css'

function SearchBar ({onSearch}) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delay = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(delay);
    }, [query])

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
            className={styles.input}
            type='text'
            value={query}
            onChange={handleChange}
            placeholder='Search for a song...'
            ></input>
            <button className={styles.button} type='submit'>Search</button>
        </form>
    )
};

export default SearchBar;