import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { gradientStyle } from './styles';

export default function BigCard() {

    const playlistData = {
        title: 'Nombre de la Playlist que quieran prom.',
        description: 'Breve descripción de la Playlist',
        image: 'https://static.posters.cz/image/750/buque-costero/coldplay-parachutes-album-cover-i56853.jpg',
    };

    return (
        <React.Fragment>
        {/* Card promocional */}
        <Card sx={{ ...gradientStyle, display: 'flex', marginBottom: 10, width:900,height:200, marginLeft:2 }}>
            <CardMedia
            component="img"
            sx={{ width: 200, height: 200}}
            image={playlistData.image}
            alt={playlistData.title}
            />
            <CardContent sx={{ flex: '1 0 auto'}}>
            <Typography component="div" variant="h4" gutterBottom color={'white'}>
                {playlistData.title}
            </Typography>
            <Typography variant="body1" color={'white'} component="div">
                {playlistData.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2}}>
                <IconButton aria-label="play" >
                <PlayArrowIcon style={{height: 38, width: 38, color:'white'}} />
                </IconButton>
            </Box>
            </CardContent>
        </Card>
        </React.Fragment>
    );
    }
