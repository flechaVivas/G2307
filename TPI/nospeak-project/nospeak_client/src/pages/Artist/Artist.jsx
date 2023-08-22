import React from 'react';
import Sidebar from '../../styled-components/Sidebar/Sidebar';
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../../pages/Home/styles.js';
import Footer from '../../styled-components/Footer/Footer';
import {
    PlaylistContainer,
    CardContainer,
    TableContainerStyled,
    CardLeftContainer,
    StyledH1
} from '../Song/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { StyledDeleteIcon } from '../../styled-components/Body/styles';
import {
    Overlay,
    AlertContainer,
    AlertTitle,
    AlertText,
    ButtonContainer,
  } from '../../styled-components/Body/styles';
import { StyledButton, StyledButtonSecondary } from '../../styled-components/styles';
import { CardRightContainer, ImagePlaylist } from './styles';

const columns = [
    { id: 'option', label: '', minWidth: 10 },
    { id: 'titulo', label: 'Titulo', minWidth: 170 },
    { id: 'duracion', label: 'Duracion', minWidth: 100},
    { id: 'album', label: 'Album', minWidth: 170 }
  ];

function createData(title, listeners, duration) {
    return { title, listeners, duration };
}

const ArtistPage = ({client}) => {

    const [artista, setArtista] = useState(null);
    const [songs, setSongs] = useState([]);
    const { artistId } = useParams();

    const [deleteAlertData, setDeleteAlertData] = React.useState(null);

    useEffect(() => {
        // Llamada a la API para obtener el artista
        client.get(`/nospeak-app/api/artistas/${artistId}/`)
          .then(response => setArtista(response.data))
          .catch(error => console.error('Error fetching artist:', error));
    
        // Llamada a la API para obtener las canciones del artista
        client.get(`/nospeak-app/api/canciones-artista/${artistId}/`)
          .then(response => setSongs(response.data))
          .catch(error => console.error('Error fetching artist songs:', error));
      }, [artistId]);

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

        try {
            await client.delete(`/nospeak-app/api/canciones/${deleteAlertData.songId}/`);
            setDeleteAlertData(null);
        } catch (error) {
            console.error('Error updating songs of artist:', error);
        }
    };
    const handleDeleteCancel = () => {
        // Cierra la alerta
        setDeleteAlertData(null);
      };

    return (
        <>
            <SpotifyBody>
                <Sidebar />
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                    {artista ? (
                        <CardContainer>
                            <CardLeftContainer>
                                <ImagePlaylist src={artista.portada}></ImagePlaylist>
                            </CardLeftContainer>

                            <CardRightContainer style={{paddingBottom: '30px'}}>
                                <p style={{marginBottom: '0', marginTop: '20px'}}>Artista</p>
                                <StyledH1 style={{ marginTop: '0px', marginBottom: '0px', fontSize: '3em'}}>{artista.nombre}</StyledH1>
                                <p style={{margin: '0'}}>{artista.nacionalidad}</p>
                                <p style={{margin: '0'}}>{artista.nro_seguidores} oyentes.</p>                                
                            </CardRightContainer>
                        </CardContainer>

                        ) : (
                                    <p>Loading user information...</p>
                        )}
                        <TableContainerStyled>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table" sx={{ margin: 0 }}>
                                    <TableHead>
                                        <TableRow>
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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={song.code}>
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
                                                        {column.id === 'duracion' && columnIndex === 2 ? (
                                                            <span>{song.duracion}</span>
                                                        ) : null}
                                                        {column.id === 'album' && columnIndex === 3 ? (
                                                            <span>{song.album.titulo}</span>
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
          <Footer />
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
    )
}

export default ArtistPage;
