import * as React from 'react';
import {FormLogin, FormLoginContainer, NavLogin, LoginButton, LoginInput, StyledH1} from '../Login/styles';
import { Navigate } from "react-router-dom";



export default function Register({client, setCurrentUser, email, setEmail, password, setPassword, username, setUsername}) {

  const [goToHome, setGoToHome] = React.useState(false);

  if (goToHome) {
    return <Navigate to="/home" />;
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/nospeak-app/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/nospeak-app/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
        setGoToHome(true);
      });
    });
  }

  return (
    <FormLoginContainer>
      <NavLogin>
        <img src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg" alt="Logo de spotify" />
      </NavLogin>
      <FormLogin>
        <StyledH1>Sign up for NoSpeak</StyledH1>
        <span>What’s your email address?</span>
        <LoginInput value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
        <span>What should we call you?</span>
        <LoginInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username"/>
        <span>Create a password</span>
        <LoginInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"  />
        <span>Repeat password</span>
        <LoginInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"  />
        <LoginButton onClick={(e) => {submitRegistration(e);}}>
          Sign up
        </LoginButton>
      </FormLogin>
    </FormLoginContainer>
    
  );
}