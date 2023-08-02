import styled from "styled-components";

const PlaylistContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
border-radius: 5px;
overflow: hidden;
background-image: linear-gradient(to bottom, #1db954, #000)
`

const CardContainer = styled.div`
display: flex;
height: 40%;
width: 100%;
background-color: transparent;
`

const TableContainer = styled.div`
display: flex;
height: 60%;
width: 100%;
background-color: #000;
opacity: 0.3;
`



export {PlaylistContainer, CardContainer, TableContainer}