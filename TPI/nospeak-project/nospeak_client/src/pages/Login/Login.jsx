import * as React from 'react';
import {FormLoginContainer, FormLogin, NavLogin, LoginButton, LoginInput, StyledH1,
RegisterContainer} from './styles.js';
import {StyledLink, StyledSpan} from './styles.js';
import {Navigate} from "react-router-dom";


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
        <StyledH1>Log in to NoSpeak</StyledH1>
        <span>Email or username</span>
        <LoginInput id="login-username" type="text" placeholder="Email or username"/>
        <span>Password</span>
        <LoginInput id="login-password" type="password" placeholder="Password"  />
        <LoginButton onClick={() => {setGoToPlayer(true);}}>
          Log in
        </LoginButton>
        <br/>
        <RegisterContainer>
          <StyledSpan>Don't have an account?</StyledSpan>
          <StyledLink to='/register'>Sign up for NoSpeak</StyledLink>
        </RegisterContainer>
      </FormLogin>
    </FormLoginContainer>
  );
}