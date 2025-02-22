import React, {useState} from 'react';
import styles from './Playlist.module.css';

function Playlist ({ playlist, onRemove, className }) {

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
            className={styles.playlistName}
            type='text'
            value={playlistName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus />
        ) : (
            <h2 onClick={handleNameClick} className={className}>{playlistName}</h2>
        )
    }
        
        <ul>
            {playlist.map(el => (
                <li key={el.id}>
                    <div className={styles.playlistList}>
                        <div className={styles.playlistTitleAuthor}>
                            <h3>{el.name}</h3> {el.author}
                        </div>
                        <button className={styles.removeButton} onClick={() => onRemove(el)}>-</button>
                    </div>
                </li>
            ))}
        </ul>
        <button className={styles.saveToSpotifyButton}>Save to Spotify</button>
        </div>
    )
};

export default Playlist;