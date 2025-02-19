import React, { useState } from 'react';

function Tracklist ({ results }) {
    return (
        <div>
            {results.map(el => (
                <ul key={el.id}>
                    <li>{el.id}</li>
                    <li>{el.name}</li>
                    <li>{el.artist}</li>
                    <li>{el.album}</li>
                </ul>
            ))}
        </div>
    )
};

export default Tracklist;