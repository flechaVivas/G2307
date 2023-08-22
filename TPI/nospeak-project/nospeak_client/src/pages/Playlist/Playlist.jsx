import React, { useEffect, useState } from 'react';
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../../pages/Home/styles.js'
import Footer from '../../styled-components/Footer/Footer'
import { PlaylistContainer, CardContainer, TableContainerStyled, CardRightContainer, TableSongs} from './styles';
import { CardLeftContainer, ImagePlaylist } from '../Song/styles';
import BigCard from '../../styled-components/Body/BigCard.jsx'
import {StyledH1, UsuarioContainer} from './styles';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { StyledDeleteIcon } from '../../styled-components/Body/styles';
import { format } from 'date-fns';
import {
    Overlay,
    AlertContainer,
    AlertTitle,
    AlertText,
    ButtonContainer,
  } from '../../styled-components/Body/styles';
import { StyledButton, StyledButtonSecondary } from '../../styled-components/styles';


const columns = [
    { id: 'option', label: '', minWidth: 10 },
    { id: 'titulo', label: 'Titulo', minWidth: 170 },
    { id: 'artista', label: 'Artista', minWidth: 170 },
    { id: 'duracion', label: 'Duracion', minWidth: 100}
  ];
  
  function createData(title, artist, duration) {
    return { title, artist, duration};
  }
  
  const rows = [
    createData('Hablando a tu corazón', 'Charly García', '4:15'),
    createData('Demoliendo Hoteles', 'Charly García', '2:16'),
    createData('Nos siguen pegando abajo', 'Charly García', '3:27'),
  ];

const Playlist = ({client}) => {

    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const { playlistId } = useParams();

    const [deleteAlertData, setDeleteAlertData] = React.useState(null);

    // const playlistData = {
    //     title: 'Nombre de la Playlist que quieran prom.',
    //     description: 'Breve descripción de la Playlist',
    //     image: 'https://static.posters.cz/image/750/buque-costero/coldplay-parachutes-album-cover-i56853.jpg',
    // };

    const fetchPlaylistInfo = async (playlistId) => {
        try {
          const response = await client.get(`/nospeak-app/api/playlists-info/${playlistId}/`);
          setSongs(response.data.canciones);
          setPlaylist(response.data)
          console.log(songs);
        } catch (error) {
          console.error('Error fetching playlist info:', error);
        }
      };

    useEffect(() => {
        fetchPlaylistInfo(playlistId);
      }, []);

    const handleDeleteSong = (songId, index) => {
        const songToDelete = songs[index];
        setDeleteAlertData({
          songId: songToDelete.id,
          songTitle: songToDelete.titulo,
          indexToRemove: index,
        });
        }

    const handleDeleteConfirm = async () => {
        const updatedSongs = songs.filter(song => song.id !== deleteAlertData.songId);
        setSongs(updatedSongs);

        const songsToUpdate = updatedSongs.map(song => ({
            ...song,
            artista: song.artista.id, // Cambiar al ID del artista
            album: song.album.id,     // Cambiar al ID del album
        }));

        try {
            await client.patch(`/nospeak-app/api/playlists/${playlistId}/`, { canciones: songsToUpdate });
            setDeleteAlertData(null);
        } catch (error) {
            console.error('Error updating playlist:', error);
        }
    };
    const handleDeleteCancel = () => {
        // Cierra la alerta
        setDeleteAlertData(null);
      };

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                        <CardContainer>
                            <CardLeftContainer>
                                <ImagePlaylist src={playlist.portada}></ImagePlaylist>
                            </CardLeftContainer>
                            
                            <CardRightContainer style={{paddingBottom: '30px'}}>
                                <p>Playlist</p>
                                <StyledH1 style={{ marginTop: '0px', marginBottom: '0px', fontSize: '3em'}}>{playlist.titulo}</StyledH1>
                                <p>{playlist.descripcion}</p>
                                {playlist.usuario ? (
                                    <UsuarioContainer className="user-date-container">
                                        <p className="user">{playlist.usuario.username}</p>
                                        <p className="date">Created on: {format(new Date(playlist.fecha_creacion), 'MMMM dd, yyyy')}</p>
                                    </UsuarioContainer>
                                ) : (
                                    <p>Loading user information...</p>
                                )}
                            </CardRightContainer>
                        </CardContainer>
                        <TableContainerStyled>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table" sx={{margin: 0}}>
                                    <TableHead >
                                        <TableRow >
                                            {columns.map((column) => (
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, backgroundColor: 'transparent', color: '#fff', fontWeight: 'bold' }}
                                                
                                                >
                                                {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {songs.map((song, rowIndex) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={song.id}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ backgroundColor: 'transparent', color: '#fff' }}
                                                >
                                                {column.id === 'option' && columnIndex === 0 ? (
                                                    <StyledDeleteIcon fontSize="small" cursor="pointer" onClick={() => handleDeleteSong(song.id, rowIndex)}/>
                                                ) : null}
                                                {column.id === 'titulo' && columnIndex === 1 ? (
                                                    <span>{song.titulo}</span>
                                                ) : null}
                                                {column.id === 'artista' && columnIndex === 2 ? (
                                                    <span>{song.artista.nombre}</span>
                                                ) : null}
                                                {column.id === 'duracion' && columnIndex === 3 ? (
                                                    <span>{song.duracion}</span>
                                                ) : null}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableContainerStyled>
                    </PlaylistContainer>
                </BodyContainer>
            </SpotifyBody>
            <Footer/>
            {deleteAlertData && (
                <Overlay>
                    <AlertContainer>
                    <AlertTitle>Eliminar canción</AlertTitle>
                    <AlertText>
                        ¿Estás seguro de que deseas eliminar la canción "{deleteAlertData?.songTitle}"?
                    </AlertText>
                    <ButtonContainer>
                        <StyledButtonSecondary style={{width: '50%', marginRight: '5px'}} onClick={handleDeleteCancel}>Cancelar</StyledButtonSecondary>
                        <StyledButton style={{backgroundColor: '#FF5630', width: '50%', marginLeft: '5px'}} onClick={() => handleDeleteConfirm()}>
                        Eliminar
                        </StyledButton>
                    </ButtonContainer>
                    </AlertContainer>
                </Overlay>
            )}
        </>  
        );
}

export default Playlist;