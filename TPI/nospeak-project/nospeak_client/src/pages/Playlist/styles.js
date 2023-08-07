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
height: 30%;
width: 100%;
background-color: transparent;
padding: 10px;
`

const TableContainer = styled.div`
display: flex;
height: 70%;
width: 100%;
background-color: #000;
opacity: 0.3;
`



export {PlaylistContainer, CardContainer, TableContainer}