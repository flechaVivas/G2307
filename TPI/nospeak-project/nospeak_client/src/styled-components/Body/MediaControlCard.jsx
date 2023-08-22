import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { 
    cardStyle, 
    TitleContainer, 
    IconContainer,
    StyledAddCircle, 
    StyledEditIcon, 
    StyledDeleteIcon
} from './styles';
import {Navigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';



export default function MediaControlCard({client, songs, setSongs, setDeleteAlertData}) {
    const theme = useTheme();

    const handleDelete = (songId, index) => {
        const songToDelete = songs[index];
        setDeleteAlertData({
          songId: songToDelete.id,
          songTitle: songToDelete.titulo,
          indexToRemove: index,
        });
      };

    return (
        <>
            <TitleContainer>
                <h1 style={{color: 'white'}}>Songs</h1>
                <IconContainer>
                    <Link to={{ pathname: `/song/${0}` }}>
                        <StyledAddCircle sx={{ color: '#FFA130'}} />
                    </Link>
                </IconContainer>
            </TitleContainer>
            <React.Fragment>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap:5 }}>
                    {songs.map((song, index) => (
                        <Card key={index} sx={{ display: 'flex', width: 300, marginBottom: 5, marginLeft:2 }}>
                        <Box sx={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5" color="white">
                                    {song.titulo}
                                </Typography>
                                <Typography variant="subtitle1" color="white" component="div">
                                    {song.artista.nombre}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <IconButton aria-label="play/pause" onClick={() => handleDelete(song.id, index)}>
                                <StyledDeleteIcon sx={{color: 'white'}} ></StyledDeleteIcon>
                            </IconButton>
                            <IconButton aria-label="play/pause">
                                <PlayArrowIcon sx={{ height: 38, width: 38, color:'white' }} />
                            </IconButton>
                            <IconButton aria-label="play/pause">
                                <Link to={{ pathname: `/song/${song.id}` }}>
                                    <StyledEditIcon sx={{ color: 'white' }} />
                                </Link>
                            </IconButton>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 160 }}
                            image={song.album.portada}
                            alt={`${song.titulo} album cover`}
                        />
                        </Card>
                    ))}
                </Box>
            </React.Fragment>
        </>
        
    );
}
