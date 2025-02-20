import React from 'react';

function Playlist ({ playlist, onRemove }) {
    return (
        <ul>
            {playlist.map(el => (
                <li key={el.id}>
                    <strong>{el.name}</strong> - {el.author}
                    <button onClick={() => onRemove(el)}>-</button>
                </li>
            ))}
        </ul>
    )
};

export default Playlist;