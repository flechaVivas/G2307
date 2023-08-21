import React, { useState } from 'react';
import { HeaderContainer, HeaderLeft, HeaderRight, SearchInput } from './styles.js';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { Navigate } from 'react-router-dom';

const Header = ({ songs, setFilteredSongs }) => {
    const [goToAccount, setGoToAccount] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    if (goToAccount) {
        return <Navigate to="/account" />;
    }

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchTerm(searchText);

        // Filtrar las canciones según el término de búsqueda
        const filteredSongs = songs.filter((song) =>
            song.titulo.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredSongs(filteredSongs);
    };

    return (
        <HeaderContainer>
            <HeaderLeft>
                <SearchIcon style={{ color: 'white' }} />
                <SearchInput
                    type="text"
                    placeholder="Search for artists, songs, or other"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </HeaderLeft>
            <HeaderRight>
                <Avatar />
                <h4 style={{ color: 'white' }} onClick={() => setGoToAccount(true)}>
                    Username
                </h4>
            </HeaderRight>
        </HeaderContainer>
    );
};

export default Header;
