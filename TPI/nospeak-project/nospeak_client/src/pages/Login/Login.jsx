import * as React from 'react';
import {FormLoginContainer, FormLogin, NavLogin, LoginButton, LoginInput, StyledH1,
RegisterContainer} from './styles.js';
import {StyledLink, StyledSpan} from './styles.js';
import {Navigate} from "react-router-dom";


export default function Login({client, setCurrentUser, email, setEmail, password, setPassword}) {

  const [goToPlayer, setGoToPlayer] = React.useState(false);

    if (goToPlayer) {
        return <Navigate to="/home" />;
    }
  
  function submitLogin(e) {
      e.preventDefault();
      client.post(
        "/nospeak-app/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
        setGoToPlayer(true);
        console.log("entre");
      });
    }

  return (
    <FormLoginContainer>
      <NavLogin>
        <img src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg" alt="Logo de spotify" />
      </NavLogin>
      <FormLogin>
        <StyledH1>Log in to NoSpeak</StyledH1>
        <span>Email</span>
        <LoginInput value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
        <span>Password</span>
        <LoginInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"  />
        <LoginButton onClick={(e) => submitLogin(e)}>
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