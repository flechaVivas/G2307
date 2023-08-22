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


const Library = ({client}) => {

    const categories = ['Playlists', 'Artists', 'Made for You'];

    const location = useLocation();

    const [goToPlaylist, setGoToPlaylist] = React.useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0]); 
    const [goToArtist, setGoToArtist] = React.useState(false);

    const [playlistData, setPlaylistData] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // Fetch playlists
        client
          .get('/nospeak-app/api/playlists-info/')
          .then((response) => {
            setPlaylistData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching playlists:', error);
          });
    
        // Fetch artists
        client
          .get('/nospeak-app/api/artistas/')
          .then((response) => {
            setArtists(response.data);
          })
          .catch((error) => {
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

    // const playlistData = [
    //     {
    //         title: 'Previa',
    //         author: 'PolaDJ',
    //         image: 'https://i.scdn.co/image/ab67706c0000da84e4c3b621c226f0a097097aeb',
    //     }, 
    //     {
    //         title: 'HipHop',
    //         author: 'Flecha Vivas',
    //         image: 'https://i.scdn.co/image/ab67706c0000d72c8b058b2ebbed37e23ca56fd3',
    //     },
    //     {
    //         title: 'To the lobby blowjob',
    //         author: 'Luquitas Mancini',
    //         image: 'https://i.scdn.co/image/ab67616d00001e029ba87744ebd8eba525286e97',
    //     },
    // ];

    // const madeForYou = [
    //     {
    //         title: 'Previa',
    //         author: 'PolaDJ',
    //         image: 'https://i.scdn.co/image/ab67706c0000da84e4c3b621c226f0a097097aeb',
    //     }
    // ]

    // const artists = [
    //     {
    //         name: 'Coldplay',
    //         image: 'https://i.scdn.co/image/ab6761610000101f989ed05e1f0570cc4726c2d3'
    //     },
    //     {
    //         name: 'Red Hot Chili Peppers',
    //         image: 'https://i.scdn.co/image/ab6761610000101fc33cc15260b767ddec982ce8'
    //     },
    //     {
    //         name: 'Biggie Smalls',
    //         image: 'https://i.scdn.co/image/ab67616d00001e02373970875cab6dc30b36f10c'
    //     },
    //     {
    //         name: 'Eminem',
    //         image: 'https://i.scdn.co/image/ab67706c0000da8454b133282efaec2a07cc05fc'
    //     },
    //     {
    //         name: 'Canserbero',
    //         image: 'https://i.scdn.co/image/ab6761610000101fa91405d63c939682e4efdcbc'
    //     },
        
    // ]

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
                                <ArtistBox key={index}>
                                    <ArtistImage src={artist.portada} alt={artist.nombre} onClick={() => {setGoToArtist(true);}} />
                                    <ArtistName>{artist.nombre}</ArtistName>
                                </ArtistBox>
                            ))
                        )}
                        {activeCategory === 'Podcasts' && (
                            <h1> Podcasts </h1>
                        )}
                        
                    </PlaylistGrid>

                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>
    )
}

export default Library