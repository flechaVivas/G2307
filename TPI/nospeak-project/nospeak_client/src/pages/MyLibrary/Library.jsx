import React from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer} from '../../styled-components/Body/styles';
import { SpotifyBody } from '../Home/styles';
import Footer from '../../styled-components/Footer/Footer';
import Header from '../../styled-components/Body/Header';
import { PlaylistBox, PlaylistDescription, PlaylistGrid, PlaylistImage, PlaylistName } from './styles';
import { Navigate, useLocation } from "react-router-dom";

const Library = () => {

    
    

    const playlistData = [
        {
            title: 'Previa',
            author: 'PolaDJ',
            image: 'https://i.scdn.co/image/ab67706c0000da84e4c3b621c226f0a097097aeb',
        }, 
        {
            title: 'Cumbia',
            author: 'PolaDJ',
            image: 'https://i.scdn.co/image/ab67706c0000da84e4c3b621c226f0a097097aeb',
        },
        {
            title: 'HipHop',
            author: 'Flecha Vivas',
            image: 'https://i.scdn.co/image/ab67706c0000d72c8b058b2ebbed37e23ca56fd3',
        },
        {
            title: 'To the lobby blowjob',
            author: 'Luquitas Mancini',
            image: 'https://i.scdn.co/image/ab67706c0000d72c8b058b2ebbed37e23ca56fd3',
        },
    ];

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <Header/>
                    <h1 style={{color: '#fff', marginLeft: '10px'}}>Library</h1>
                    
                    <PlaylistGrid>
                        {playlistData.map((playlist, index) => (
                            <PlaylistBox key={index}>
                                <PlaylistImage src={playlist.image}></PlaylistImage>
                                <PlaylistName>{playlist.title}</PlaylistName>
                                <PlaylistDescription>{playlist.author}</PlaylistDescription>
                            </PlaylistBox>
                        ))}
                        
                    </PlaylistGrid>

                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>
    )
}

export default Library