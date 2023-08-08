import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BodyContainer } from '../Body/styles';
import { SpotifyBody } from '../Player/styles.js'
import Footer from '../Footer/Footer'
import Header from '../Body/Header';
import { CategoryContainer, CategoryBox, CategoryImage, CategoryName } from './Category.jsx';


const Search = () => {
    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer css={`align-items: center;`}>
                    <Header/>
                    <h1 style={{color: '#fff', marginLeft: '10px'}}>Categories</h1>

                    <CategoryContainer>
                        <CategoryBox backgroundColor="#FFB6C1">
                            <CategoryName>For You</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#B19CD9">
                            <CategoryName>New Releases</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#FFDAB9">
                            <CategoryName>Rankings</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#F0D58A">
                            <CategoryName>Live</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#A6D6D6">
                            <CategoryName>Cumbia</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#FFD699">
                            <CategoryName>Reggeaton</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#C3C3E5">
                            <CategoryName>Rock</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#F0E68C">
                            <CategoryName>Pop</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#98FB98">
                            <CategoryName>Hip Hop</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#FFB6C1">
                            <CategoryName>Indie</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#B19CD9">
                            <CategoryName>Jazz</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#87CEEB">
                            <CategoryName>Blues</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#D8BFD8">
                            <CategoryName>Latina</CategoryName>
                        </CategoryBox>
                        <CategoryBox backgroundColor="#98D8D8">
                            <CategoryName>Country</CategoryName>
                        </CategoryBox>
                    </CategoryContainer>
                    
                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>  )
}

export default Search;