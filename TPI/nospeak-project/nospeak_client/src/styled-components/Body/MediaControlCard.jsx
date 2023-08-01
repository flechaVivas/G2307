import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { cardStyle } from './styles';
// Importa tu archivo JSON aquí
import data from './Songs.jsx';

export default function MediaControlCard() {
    const theme = useTheme();

    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap:5 }}>
            {data.map((song, index) => (
                <Card key={index} sx={{ display: 'flex', width: 300, marginBottom: 5, marginLeft:2 }}>
                <Box sx={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" color="white">
                        {song.title}
                    </Typography>
                    <Typography variant="subtitle1" color="white" component="div">
                        {song.artist}
                    </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous" >
                        {theme.direction === 'rtl' ? <SkipNextIcon sx={{color:'white' }} /> : <SkipPreviousIcon sx={{color:'white' }} />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38, color:'white' }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon sx={{color:'white' }} /> : <SkipNextIcon sx={{color:'white' }} />}
                    </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 160 }}
                    image={song.albumCover}
                    alt={`${song.title} album cover`}
                />
                </Card>
            ))}
        </Box>
        </React.Fragment>
    );
}
