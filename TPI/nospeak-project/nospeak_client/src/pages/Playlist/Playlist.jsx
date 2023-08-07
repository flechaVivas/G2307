import React from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../../pages/Home/styles.js'
import Footer from '../../styled-components/Footer/Footer'
import { PlaylistContainer, CardContainer, TableContainer } from './styles';
import BigCard from '../../styled-components/Body/BigCard.jsx'

const Playlist = () => {

    const playlistData = {
        title: 'Nombre de la Playlist que quieran prom.',
        description: 'Breve descripción de la Playlist',
        image: 'https://static.posters.cz/image/750/buque-costero/coldplay-parachutes-album-cover-i56853.jpg',
    };

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                        <CardContainer>
                            <BigCard sx={{backgroundColor: "transparent"}}></BigCard>
                        </CardContainer>
                        <TableContainer>

                        </TableContainer>
                    </PlaylistContainer>
                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>  )
}

export default Playlist;