import React, { useState } from 'react';
import Header from './Header.jsx';
import MediaControlCard from './MediaControlCard.jsx';
import BigCard from './BigCard.jsx';
import { BodyContainer } from './styles.js';

export default function Body({ client, songs, setSongs }) {
    const [filteredSongs, setFilteredSongs] = useState(songs);

    return (
        <BodyContainer>
            <Header songs={songs} setFilteredSongs={setFilteredSongs} />
            <MediaControlCard
                client={client}
                songs={filteredSongs} // Usa las canciones filtradas
                setSongs={setSongs}
                style={{ marginBottom: -150 }}
            />
        </BodyContainer>
    );
}
