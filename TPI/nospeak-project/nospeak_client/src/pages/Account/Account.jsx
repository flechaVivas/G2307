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

const Account = () => {
    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer>
                    <AccountContainer>
                        <AccountContainerLeft>
                            <StyledH1>Account details</StyledH1>
                            <h3>Email address</h3>
                            <AccountInput id="login-username" type="text" placeholder="Email address"/>
                            <h3>Username</h3>
                            <AccountInput id="login-username" type="text" placeholder="Username"/>
                            <h3>Password</h3>
                            <AccountInput id="login-password" type="password" placeholder="Password"  />
                            <h3>Phone number</h3>
                            <AccountInput id="login-password" type="text" placeholder="Phone number"  />
                            <br/>
                            <br/>
                            <AccountButton>Save</AccountButton>
                        </AccountContainerLeft>
                        <AccountContainerRight>
                            <Avatar style={{width: '250px', height: '250px', margin: '20px'}} />
                            <h1>Username</h1>
                            <h3 style={{paddingTop: '20px'}}>Do you want to log out?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}}>Log out</AccountButton>

                            <h3 style={{paddingTop: '20px'}}>Do you want to delete your account?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}}>Delete account</AccountButton>
                        </AccountContainerRight>
                    </AccountContainer>
                </BodyContainer>
            </SpotifyBody>
            <Footer/>
        </>  )
}

export default Account;