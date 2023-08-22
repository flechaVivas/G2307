import React, { useState, useEffect } from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer} from '../../styled-components/Body/styles';
import { SpotifyBody } from '../Home/styles';
import Footer from '../../styled-components/Footer/Footer';
import Header from '../../styled-components/Body/Header';
import { NavContainer, NavItem, PlaylistBox, PlaylistDescription, PlaylistGrid, PlaylistImage, PlaylistName } from './styles';
import { ArtistBox, ArtistImage, ArtistName, ArtistGrid } from './styles';
import { Navigate, useLocation } from 'react-router-dom';
import { StyledAddCircle, IconContainer } from '../../styled-components/Body/styles';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';



const Library = ({client}) => {

    const categories = ['Playlists', 'Artists', 'Albums', 'Made for You'];

    const location = useLocation();

    const [goToPlaylist, setGoToPlaylist] = React.useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0]); 
    const [goToArtist, setGoToArtist] = React.useState(false);

    const [playlistData, setPlaylistData] = useState([]);
    const [artists, setArtists] = useState([]);

    const [albumData, setAlbumData] = useState([]);


    const user = useSelector(state => state.user.user);

    useEffect(() => {
        // Llamada a la API para obtener las playlists del usuario
        client.get(`/nospeak-app/api/playlists-usuario-info/${user.id}`)
            .then(response => {
                setPlaylistData(response.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    
        // Llamada a la API para obtener los albums
        client.get('/nospeak-app/api/albums/')
            .then(response => {
                setAlbumData(response.data);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
            });
    
        // Fetch artists
        client.get('/nospeak-app/api/artistas/')
            .then(response => {
                setArtists(response.data);
            })
            .catch(error => {
                console.error('Error fetching artists:', error);
            });
    }, []);
    

      if (goToArtist && location.pathname !== "/artist") {
        return <Navigate to="/artist" />;
    }

    if (goToPlaylist && location.pathname !== "/playlist") {
        return <Navigate to="/playlist" />;
    }

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <Header/>
                    <h1 style={{color: '#fff', marginLeft: '10px'}}>Library</h1>

                    <NavContainer>
                        {categories.map(category => (
                            <NavItem
                                key={category}
                                onClick={() => handleCategoryChange(category)} // Change category on click
                                active={category === activeCategory}
                            >
                            {category}
                            </NavItem>
                        ))}
                        <IconContainer>
                            <Link to={{ pathname: `/song/${0}` }}>
                                <StyledAddCircle sx={{ color: '#FFA130'}} />
                            </Link>
                        </IconContainer>
                    </NavContainer>
                    <PlaylistGrid>
                        {activeCategory === 'Playlists' && (
                            playlistData.map((playlist, index) => (
                            <Link key={index} to={`/playlist/${playlist.id}`}>
                                <PlaylistBox key={index}>
                                    <PlaylistImage src={playlist.portada}></PlaylistImage>
                                    <PlaylistName>{playlist.titulo}</PlaylistName>
                                    <PlaylistDescription>{playlist.usuario.username}</PlaylistDescription>
                                </PlaylistBox>
                            </Link>
                        ))
                        )}
                        {/* {activeCategory === 'Made for You' && (
                            madeForYou.map((playlist, index) => (
                                <PlaylistBox key={index}>
                                    <PlaylistImage src={playlist.image}></PlaylistImage>
                                    <PlaylistName>{playlist.title}</PlaylistName>
                                    <PlaylistDescription>{playlist.author}</PlaylistDescription>
                                </PlaylistBox>
                            )
                        ))} */}
                        {activeCategory === 'Artists' && (
                            artists.map((artist, index) => (
                                <Link key={index} to={`/artist/${artist.id}`}>
                                    <ArtistBox key={index}>
                                        <ArtistImage src={artist.portada} alt={artist.nombre} onClick={() => {setGoToArtist(true);}} />
                                        <ArtistName>{artist.nombre}</ArtistName>
                                    </ArtistBox>
                                </Link>
                            ))
                        )}
                        {activeCategory === 'Podcasts' && (
                            <h1> Podcasts </h1>
                        )}
                        {activeCategory === 'Albums' && (
                            albumData.map((album, index) => (
                                <Link key={index} to={`/album/${album.id}`}>
                                    <PlaylistBox key={index}>
                                        <PlaylistImage src={album.portada}></PlaylistImage>
                                        <PlaylistName>{album.titulo}</PlaylistName>
                                        {/* Puedes agregar más detalles aquí si lo deseas */}
                                    </PlaylistBox>
                                </Link>
                            ))
                        )}
                        
                    </PlaylistGrid>

                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>
    )
}

export default Library