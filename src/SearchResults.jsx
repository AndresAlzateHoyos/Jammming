import React, { useState } from 'react';

function SearchResults({results}) {
    return (
        <ul >
        {results.map((el, index) => (
            <li key={index}>{el}</li>
        ))}
        </ul>
    )
    };

    export default SearchResults;