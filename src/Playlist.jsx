import React, { useState } from 'react';

function Playlist ({ playlist }) {
    return (
        <ul>
            {playlist.map(el => (
                <li key={el.id}>
                    <strong>{el.name}</strong> - {el.author}
                </li>
            ))}
        </ul>
    )
};

export default Playlist;