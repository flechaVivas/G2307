import styled from "styled-components";

const PlaylistContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #000;
height: 100%;
width: 100%;
border-radius: 5px;
overflow: hidden;
`

const CardContainer = styled.div`
display: flex;
height: 30%;
width: 100%;
background-image: linear-gradient(to bottom, black, #232323);
`

const TableContainer = styled.div`
display: flex;
height: 60%;
width: 100%;
background-color: #000;
`



export {PlaylistContainer, CardContainer, TableContainer}