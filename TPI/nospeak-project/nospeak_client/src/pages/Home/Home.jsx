import React from 'react';
import Sidebar from '../../styled-components/Sidebar/Sidebar';
import Body from '../../styled-components/Body/Body';
import { SpotifyBody, HomeContainer } from './styles.js';
import Footer from '../../styled-components/Footer/Footer';

const Home = () => {
    return (
        <HomeContainer>
            <SpotifyBody>
                <Sidebar/>
                <Body/>
            </SpotifyBody>
            <Footer/>
        </HomeContainer>
        );
    }
    

export default Home;