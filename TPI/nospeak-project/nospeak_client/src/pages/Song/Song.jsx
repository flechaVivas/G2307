import React from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../../pages/Home/styles.js'
import Footer from '../../styled-components/Footer/Footer'
import { PlaylistContainer, CardContainer, TableContainerStyled,
CardLeftContainer, CardRightContainer, ImagePlaylist, StyledH1,
FormContainer, ColumnForm, Label, Input, ComboBox, ButtonContainer, 
StyledButton, ColumnContainer} from './styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';


export default function Song({client}) {

    
    const { songId } = useParams();
    const [song, setSong] = React.useState(null);
    console.log(songId);


    React.useEffect(() => {
        client.get(`/nospeak-app/api/canciones/${songId}/`)
        .then(response => {
            setSong(response.data);
        })
        .catch(error => {
            console.error('Error al obtener la cancion:', error);
        });
    }, [songId]);
    console.log(song)

    if (!song) {
        return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se obtiene la canción
    }

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                        <CardContainer>
                            <CardLeftContainer>
                                <ImagePlaylist src={song.album.portada}></ImagePlaylist>
                            </CardLeftContainer>
                            <CardRightContainer>
                                <StyledH1>{song.titulo}</StyledH1>
                                <p>{song.artista.nombre}</p>
                            </CardRightContainer>
                        </CardContainer>
                        <TableContainerStyled>
                            <FormContainer>
                                <ColumnContainer>
                                    <ColumnForm>
                                        <Label>Título</Label>
                                        <Input type="text" />

                                        <Label>Año lanzamiento</Label>
                                        <Input type="text" />

                                        <Label>Género</Label>
                                        <Input type="text" />
                                        
                                        <Label>Duración</Label>
                                        <Input type="text" />
    
                                    </ColumnForm>
                                    <ColumnForm>
                                        <Label>Audio</Label>
                                        <Input type="text" />
                                        
                                        <Label>Spotify id</Label>
                                        <Input type="text" />
                                        
                                        <Label>Artista</Label>
                                        <ComboBox>
                                        {/* Opciones del ComboBox */}
                                        </ComboBox>
                                        
                                        <Label>Álbum</Label>
                                        <ComboBox>
                                        {/* Opciones del ComboBox */}
                                        </ComboBox>
                                    </ColumnForm>
                                </ColumnContainer>
                                <ButtonContainer>
                                    <StyledButton style={{backgroundColor: '#120120120'}}>Cancelar</StyledButton>
                                    <StyledButton>Guardar</StyledButton>
                                </ButtonContainer>
                            </FormContainer>
                        </TableContainerStyled>
                    </PlaylistContainer>
                </BodyContainer>
            </SpotifyBody>
            {/* <Footer/> */}
        </>  )
}
