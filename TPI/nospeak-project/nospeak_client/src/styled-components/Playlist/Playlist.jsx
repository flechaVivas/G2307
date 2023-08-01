import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BodyContainer } from '../Body/styles';
import { SpotifyBody } from '../Player/styles.js'
import Footer from '../Footer/Footer'
import { Avatar } from '@mui/material';
import { PlaylistContainer, CardContainer, TableContainer } from './styles';

const Playlist = () => {

    

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                        <CardContainer>
                            
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