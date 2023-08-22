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
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
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
    const { playlistId } = useParams();

    const [deleteAlertData, setDeleteAlertData] = React.useState(null);

    const [playlist, setPlaylist] = useState([]);
    const [allSongs, setAllSongs] = useState([]);


    const fetchPlaylistAndSongs = async (playlistId) => {
        try {
          const response = await client.get(`/nospeak-app/api/playlists-info/${playlistId}/`);
          setPlaylist(response.data);
          setAllSongs(response.data.canciones.map(song => ({ ...song, isInPlaylist: true })));
        } catch (error) {
          console.error('Error fetching playlist info:', error);
        }
      };
    
      useEffect(() => {
        fetchPlaylistAndSongs(playlistId);
      }, [playlistId]);
    

    

    const handleDeleteSong = (songId, index) => {
        const songToDelete = allSongs[index];
        setDeleteAlertData({
          songId: songToDelete.id,
          songTitle: songToDelete.titulo,
          indexToRemove: index,
        });
        }

        const handleDeleteConfirm = async () => {
            const updatedSongs = allSongs.filter(song => song.id !== deleteAlertData.songId);
            setAllSongs(updatedSongs);
        
            const songsToUpdate = updatedSongs.map(song => ({
                ...song,
                artista: song.artista.id,
                album: song.album.id,
            }));
        
            try {
                await client.patch(`/nospeak-app/api/playlists/${playlistId}/`, { canciones: songsToUpdate });
                setDeleteAlertData(null);
            } catch (error) {
                console.error('Error updating playlist:', error);
            }
        };
    const handleDeleteCancel = () => {
        setDeleteAlertData(null);
      };

      const handleAddSongToPlaylist = async (songId) => {
        const updatedAllSongs = allSongs.map(song => {
          if (song.id === songId) {
            return { ...song, isInPlaylist: true };
          }
          return song;
        });
        
        // Update state with the new song status
        setAllSongs(updatedAllSongs);
        
        // Prepare updated songs for API
        const updatedSongs = updatedAllSongs
          .filter(song => song.isInPlaylist)
          .map(song => ({
            ...song,
            artista: song.artista.id,
            album: song.album.id,
          }));
    
        try {
          await client.patch(`/nospeak-app/api/playlists/${playlistId}/`, { canciones: updatedSongs });
        } catch (error) {
          console.error('Error updating playlist with added song:', error);
        }
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
                                    {allSongs
                                        .filter(song => song.isInPlaylist)
                                        .map((song, rowIndex) => (
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
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <StyledH1 style={{color: 'white', fontSize: '1.5em'}}>Canciones para añadir</StyledH1>
                                <Table stickyHeader aria-label="sticky table" sx={{ margin: 0 }}>
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
                                        {allSongs
                                            .filter(song => !song.isInPlaylist)
                                            .map((song, rowIndex) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={song.id}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ backgroundColor: 'transparent', color: '#fff' }}
                                                >
                                                {column.id === 'option' && columnIndex === 0 ? (
                                                    <PlaylistAdd fontSize="small" cursor="pointer" onClick={() => handleAddSongToPlaylist(song.id)} />
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