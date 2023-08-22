import styled from "styled-components";


const CardRightContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: transparent;
width: 78%;
color: #fff;
padding-bottom: 15px;
gap: 10px;
`

export const CardLeftContainer = styled.div`
display: flex;
flex-direction: column;
background-color: transparent;
width: 20%;
align-items: center;
justify-content: center;
padding: 15px 15px 15px 15px;
`

export const ImagePlaylist = styled.img`
  width: 150px; /* Ajusta el tamaño según sea necesario */
  height: 150px;
  border-radius: 50%; /* Agrega el estilo de borde redondeado */
  object-fit: cover; /* Ajusta cómo se ajusta la imagen dentro del círculo */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Opcional: sombra para resaltar */
`;


export {CardRightContainer}