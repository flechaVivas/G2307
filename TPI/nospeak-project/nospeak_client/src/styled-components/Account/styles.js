import styled from "styled-components";
import {LoginInput} from '../Login/styles';
import { DateInput, StyledSelect} from '../Register/styles';
import { LoginButton } from "../Login/styles";


const AccountContainer = styled.div`
display: flex;
background-color: #000;
border-radius: 10px;
margin: 10px 10px 0px 10px;
height: 100%;
align-items: center;
color: white;
padding: 10px;
`

const AccountContainerLeft = styled.div`
flex-direction: column;
background-color: #101010;
border-radius: 10px;
height: 100%;
width: 60%;
align-items: center;
color: white;
padding: 0px 0px 0px 30px;
margin-right: 10px;
`

const AccountContainerRight = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: #101010;
border-radius: 10px;
height: 100%;
color: white;
padding: 0px 0px 0px 30px;
width: 40%;
margin: 0 auto;
`

const StyledH1 = styled.h1`
padding: 30px;
font-size: 40px;
margin: 0px;
`

const AccountInput = styled(LoginInput)`
display: block;
margin-block: 10px;
width: 60%;
`

const AccountDateInput = styled(DateInput)`
width: 80px;
margin-left: 0px;
`

const AccountStyledSelect = styled(StyledSelect)`
width: 120px;
`
const AccountButton = styled(LoginButton)`
margin: 0px;
width: 65%;
`
export {AccountContainer, StyledH1, AccountInput, AccountDateInput,AccountStyledSelect, AccountButton,
AccountContainerLeft, AccountContainerRight
};