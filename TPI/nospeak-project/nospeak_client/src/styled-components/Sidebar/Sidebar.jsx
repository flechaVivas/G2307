import * as React from 'react';
import { SidebarContainer, Playlists } from './styles.js';
import SidebarChoice from './SidebarChoice.jsx';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Navigate } from "react-router-dom";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function Sidebar() {

    const [goToPlaylist, setGoToPlaylist] = React.useState(false);

    if (goToPlaylist) {
        return <Navigate to="/playlist" />;
    }


    return (
        <SidebarContainer>
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg" alt="Logo de Spotify" />
            <SidebarChoice title="Home" Icon={HomeIcon}/>
            <SidebarChoice title="Search" Icon={SearchIcon}/>
            <SidebarChoice title="Your Library" Icon={LibraryMusicIcon}/>
            <Playlists>PLAYLISTS</Playlists>
            <hr />
            <SidebarChoice title="Roadtrip"/>
            <SidebarChoice title="Previa - POLACO GDC" onClick={() => {setGoToPlaylist(true);}}/>
            <SidebarChoice title="Top 50 - Argentina"/>
            <SidebarChoice title="Top 50 - Global"/>
        </SidebarContainer>
    )
}
