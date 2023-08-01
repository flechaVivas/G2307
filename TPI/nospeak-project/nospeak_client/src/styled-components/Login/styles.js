import styled from "styled-components";
import {Link} from 'react-router-dom';

const FormLoginContainer = styled.div`
display:grid;
place-items:center;
height:100%;
background: linear-gradient(0deg, black, rgb(50,50,50));
& img{
    width:100%;
}
`

const FormLogin = styled.div`
display:flex;
flex-direction: column;
background-color: black;
color: white;
row-gap: normal;
border-radius: 8px;
place-items:center;
height:80vh;
width: 50%;
margin-top: 30px;
font-weight: bold;
font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
`

const NavLogin = styled.nav`
display: block;
background-color: black;
color: white;
padding: 32px 0px 32px 51px;
margin-top: 0px;
margin-bottom: 0px;
width: 100%;
& img{
    height: 50px;
    width:160px;
}
`

const LoginInput = styled.input`
appearance: none;
background-image: none;
border: 0px;
font-size: 1rem;
font-weight: 400;
font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
transition: box-shadow 0.1s ease-in-out 0s, color 0.1s ease-in-out 0s;
inline-size: 100%;
box-sizing: border-box;
-webkit-tap-highlight-color: transparent;
margin: 5px 20px 20px 20px;
border-radius: var(--border-radius-md,4px);
padding-inline: 14px;
padding-block-start: var(--spacer--2,8px);
padding-block-end: var(--spacer--2,8px);
min-block-size: var(--control-size-md,48px);
background-color: var(--background-base,#000);
box-shadow: inset 0 0 0 1px var(--essential-subdued,#878787);
color: white;
width: 40%;

&:hover{
    outline: white solid;
}

`


const LoginButton = styled.button`
padding:10px;
background-color:#1db954;
border-radius:90px;
color:#000;
font-weight:bold;
font-size: 20px;
display: inline-block;
position: relative;
text-decoration:none;
text-transform: none;
width: 40%;
margin-block: 10px;
font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
`

const StyledLink = styled(Link)`
color: white;
&:hover{
    color: #1db954;
}
`

export {FormLoginContainer, FormLogin, NavLogin, LoginButton, LoginInput, StyledLink};