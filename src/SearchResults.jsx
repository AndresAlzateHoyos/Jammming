import React, { useState } from 'react';

function SearchResults({results}) {
    if(results.length === 0) return null;
    return (
        <ul >
        {results.map((el, index) => (
            <li key={index}>{el}</li>
        ))}
        </ul>
    )
    };

    export default SearchResults;