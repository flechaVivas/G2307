import React from 'react'
import Header from './Header.jsx'
import MediaControlCard from './MediaControlCard.jsx'
import BigCard from './BigCard.jsx'
import { BodyContainer } from './styles.js'
    const Body = () => {
    return (
        <BodyContainer>
            <Header/>
            <BigCard />
            <MediaControlCard style={{marginBottom:-150}}/>
        </BodyContainer>
    )
    }

    export default Body