import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BodyContainer } from '../Body/styles';
import { SpotifyBody } from '../Player/styles.js'
import Footer from '../Footer/Footer'
import {AccountContainer, AccountContainerLeft, AccountContainerRight, StyledH1} from './styles'
import {FormLoginContainer, FormLogin, NavLogin, LoginButton} from '../Login/styles';
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
                <BodyContainer css={`align-items: center;`}>
                    <AccountContainer>
                        <AccountContainerLeft>
                            <StyledH1>Account details</StyledH1>
                            <h3>Email address</h3>
                            <AccountInput id="login-username" type="text" placeholder="Email address"/>
                            <h3>Username</h3>
                            <AccountInput id="login-username" type="text" placeholder="Username"/>
                            <h3>Password</h3>
                            <AccountInput id="login-password" type="password" placeholder="Password"  />
                            <h3>Gender</h3>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio color='primary' />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color='primary' />} label="Male" />
                                </RadioGroup>
                            </FormControl>

                            <h3>Date of birth</h3>
                            <div css={`display: inline-flex;`}>
                                <AccountDateInput id="login-password" type="text" placeholder="DD" />
                                <AccountStyledSelect>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </AccountStyledSelect>
                                <AccountDateInput id="login-password" type="text" placeholder="YYYY"/>

                            </div>
                            <AccountButton>Save</AccountButton>
                        </AccountContainerLeft>
                        <AccountContainerRight>
                            <Avatar style={{width: '300px', height: '300px', margin: '20px'}} />
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