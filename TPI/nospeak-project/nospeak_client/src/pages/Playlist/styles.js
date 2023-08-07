import styled from "styled-components";
import BigCard from '../../styled-components/Body/BigCard.jsx'

const PlaylistContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
border-radius: 5px;
overflow: hidden;
background-image: linear-gradient(to bottom, #FFA130, #000)
`

const CardContainer = styled.div`
display: flex;
flex-direction: row;
height: 30%;
width: 100%;
background-color: transparent;
`

const TableContainer = styled.div`
display: flex;
height: 70%;
width: 100%;
background-color: #000;
opacity: 0.3;
`

const CardLeftContainer = styled.div`
display: flex;
background-color: transparent;
width: 20%;
align-items: center;
justify-content: center;
`

const CardRightContainer = styled.div`
display: flex;
flex-direction: column;
background-color: transparent;
width: 78%;
color: #fff;
`

const ImagePlaylist = styled.img`
block-size: 80%;
inline-size: 80%;
margin: auto;
object-fit: cover;
width: fit-content;
box-shadow: 0px 0px 10px 1px;
`

const StyledH1 = styled.h1` 
font-size:35px;

@media (max-width: 500px){
    font-size:29px;
}
`

export {PlaylistContainer, CardContainer, TableContainer, CardLeftContainer, 
CardRightContainer, ImagePlaylist, StyledH1}