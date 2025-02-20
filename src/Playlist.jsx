import React, {useState} from 'react';

function Playlist ({ playlist, onRemove }) {

    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [isEditing, setIsEditing] = useState(false);

    const handleNameClick = () => {
        setIsEditing(true);
    }

    const handleChange = (event) => {
        setPlaylistName(event.target.value)
    };

    const handleBlur = () => {
        if(playlistName.trim() === '') {
            setPlaylistName('My Playlist');
        }
        setIsEditing(false);
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            if(playlistName.trim() === '') {
                setPlaylistName('My Playlist')
            }
            setIsEditing(false);
        }
    };

    return (
        <div>
        {isEditing ? (
            <input
            type='text'
            value={playlistName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus />
        ) : (
            <h2 onClick={handleNameClick}>{playlistName}</h2>
        )
    }
        
        <ul>
            {playlist.map(el => (
                <li key={el.id}>
                    <strong>{el.name}</strong> - {el.author}
                    <button onClick={() => onRemove(el)}>-</button>
                </li>
            ))}
        </ul>
        </div>
    )
};

export default Playlist;