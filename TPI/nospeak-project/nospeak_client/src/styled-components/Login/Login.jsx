import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {FormLoginContainer, FormLogin, NavLogin, LoginButton, LoginInput} from './styles.js';
import {StyledLink} from './styles.js';
import styled from 'styled-components/macro';
import {Link, Navigate } from "react-router-dom";


export default function Login() {

  const [goToPlayer, setGoToPlayer] = React.useState(false);

    if (goToPlayer) {
        return <Navigate to="/player" />;
    }

  return (
    <FormLoginContainer>
      <NavLogin>
        <img src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg" alt="Logo de spotify" />
      </NavLogin>
      <FormLogin>
        <h1 css={`margin: 60px; font-size:50px;`}>Log in to Spotify</h1>
        <span>Email or username</span>
        <LoginInput id="login-username" type="text" placeholder="Email or username" startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>}
        />
        <span>Password</span>
        <LoginInput id="login-password" type="password" placeholder="Password"  />
        <LoginButton onClick={() => {setGoToPlayer(true);}}>
          Log in
        </LoginButton>
        <span css={`color: #656565; margin-top: 20px; margin-bottom: 10px`}>Don't have an account?</span> 
        <StyledLink to='/register'>Sign up for Spotify</StyledLink>
      </FormLogin>
    </FormLoginContainer>
    
  );
}