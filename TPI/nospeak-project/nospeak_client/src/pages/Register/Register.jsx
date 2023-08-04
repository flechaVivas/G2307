import * as React from 'react';
import {FormLogin, FormLoginContainer, NavLogin, LoginButton, LoginInput, StyledH1} from '../Login/styles';
import { Navigate } from "react-router-dom";



export default function Register() {

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
        <StyledH1>Sign up for NoSpeak</StyledH1>
        <span>What’s your email address?</span>
        <LoginInput id="login-username" type="text" placeholder="Email address"/>
        <span>What should we call you?</span>
        <LoginInput id="login-username" type="text" placeholder="Username"/>
        <span>Create a password</span>
        <LoginInput id="login-password" type="password" placeholder="Password"  />
        <span>Repeat password</span>
        <LoginInput id="login-password" type="password" placeholder="Repeat password"  />
        <span>What’s your phone number?</span>
        <LoginInput id="login-password" type="text" placeholder="Phone number"  />
        <LoginButton onClick={() => {setGoToPlayer(true);}}>
          Sign up
        </LoginButton>
      </FormLogin>
    </FormLoginContainer>
    
  );
}