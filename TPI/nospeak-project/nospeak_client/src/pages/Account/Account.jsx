import React from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../Home/styles.js'
import Footer from '../../styled-components/Footer/Footer'
import {AccountContainer, AccountContainerLeft, AccountContainerRight, StyledH1} from './styles'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Radio } from '@mui/material';
import { AccountDateInput, AccountStyledSelect, AccountInput, AccountButton} from './styles';
import { Avatar } from '@mui/material';
import {Navigate} from "react-router-dom";

export default function Account({client, setCurrentUser, email, setEmail, password, setPassword, username, setUsername}){

    const [goToInicio, setGoToInicio] = React.useState(false);

    if (goToInicio) {
        return <Navigate to="/" />;
    }
    
    function submitLogout(e) {
        e.preventDefault();
        client.post(
          "/nospeak-app/logout",
          {withCredentials: true}
        ).then(function(res) {
          setCurrentUser(false);
          setGoToInicio(true);
        });
    }

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer>
                    <AccountContainer>
                        <AccountContainerLeft>
                            <StyledH1>Account details</StyledH1>
                            <h3>Email address</h3>
                            <AccountInput type="email" placeholder="Email address" />
                            <h3>Username</h3>
                            <AccountInput type="text" placeholder="Username" />
                            <h3>Password</h3>
                            <AccountInput type="password" placeholder="Password" />
                            <br/>
                            <br/>
                            <AccountButton>Save</AccountButton>
                        </AccountContainerLeft>
                        <AccountContainerRight>
                            <Avatar style={{width: '250px', height: '250px', margin: '20px'}} />
                            <h1>Username</h1>
                            <h3 style={{paddingTop: '20px'}}>Do you want to log out?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}} onClick={(e) => submitLogout(e)}>Log out</AccountButton>

                            <h3 style={{paddingTop: '20px'}}>Do you want to delete your account?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}}>Delete account</AccountButton>
                        </AccountContainerRight>
                    </AccountContainer>
                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>  )
}

