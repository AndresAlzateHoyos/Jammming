import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({results, onAdd}) {
    if(results.length === 0) return null;
    return (
        <div>
            <Tracklist
                tracks={results}
                onAdd={onAdd}
                isRemoval={false}
            />   
        </div>
    )
    };

    export default SearchResults;