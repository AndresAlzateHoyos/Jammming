import React from 'react';
import styles from './Track.module.css';

function Track ({ track, onAdd, onRemove, isRemoval }) {
    const handleClick = () => {
        if(isRemoval) {
            onRemove(track);
        } else {
            onAdd(track);
        }
    };

    return (
        <div className={`Track ${styles.Track}`}>
            <div className='Track-information'>
                <h3>{track.name}</h3>
                <p>{track.author}</p>
            </div>
            <button className={`Track-action ${styles.trackAction}`} onClick={handleClick}>{isRemoval ? '-' : '+'}</button>
        </div>
    )
};

export default Track;