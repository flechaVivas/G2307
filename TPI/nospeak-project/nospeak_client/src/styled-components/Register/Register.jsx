import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {FormLoginContainer, FormLogin, NavLogin, LoginButton, LoginInput} from '../Login/styles';
import { Navigate } from "react-router-dom";
import {StyledRadio, StyledSelect, DateInput} from './styles';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { Radio } from '@mui/material';


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
        <h1 css={`margin: 60px; font-size:50px;`}>Sign up for Spotify</h1>
        <span>What’s your email address?</span>
        <LoginInput id="login-username" type="text" placeholder="Email address"/>
        <span>What should we call you?</span>
        <LoginInput id="login-username" type="text" placeholder="Username"/>
        <span>Create a password</span>
        <LoginInput id="login-password" type="password" placeholder="Password"  />
        <span>Repeat password</span>
        <LoginInput id="login-password" type="password" placeholder="Repeat password"  />
        <FormControl>
            <span>Gender</span>
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
        <span>What’s your date of birth?</span>
        <div css={`display: inline-flex;`}>
            <DateInput id="login-password" type="text" placeholder="DD"/>
            <StyledSelect>
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
            </StyledSelect>
            <DateInput id="login-password" type="text" placeholder="YY"/>
        </div>
        
        <LoginButton onClick={() => {setGoToPlayer(true);}}>
          Sign up
        </LoginButton>
      </FormLogin>
    </FormLoginContainer>
    
  );
}