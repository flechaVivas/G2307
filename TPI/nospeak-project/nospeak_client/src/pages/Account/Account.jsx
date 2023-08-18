import React from 'react'
import Sidebar from '../../styled-components/Sidebar/Sidebar'
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../Home/styles.js'
import {AccountContainer, AccountContainerLeft, AccountContainerRight, StyledH1} from './styles'
import { AccountInput, AccountButton} from './styles';
import { Avatar } from '@mui/material';
import {Navigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {clearUser} from '../../redux/userSlice.js';
export default function Account({client, setCurrentUser, email, setEmail, password, setPassword, username, setUsername}){

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch('/nospeak-app/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        if (response.ok) {
            dispatch(clearUser());
            return <Navigate to="/Login" />;
        } else {
            console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
        };;
        

    
    // const [goToInicio, setGoToInicio] = React.useState(false);

    // if (goToInicio) {
    //     return <Navigate to="/" />;
    // }
    
    // function submitLogout(e) {
    //     e.preventDefault();
    //     client.post(
    //       "/nospeak-app/logout",
    //       {withCredentials: true}
    //     ).then(function(res) {
    //       setCurrentUser(false);
    //       setGoToInicio(true);
    //     });
    // }

    return (
        <>
            <SpotifyBody>
                <Sidebar/>
                <BodyContainer>
                    <AccountContainer>
                        <AccountContainerLeft>
                            <StyledH1>Account details</StyledH1>
                            <h3>{user.email}</h3>
                            <AccountInput type="email" placeholder="Email address" />
                            <h3>{user.name}</h3>
                            <AccountInput type="text" placeholder="Username" />
                            <h3>{user.password}</h3>
                            <AccountInput type="password" placeholder="Password" />
                            <br/>
                            <br/>
                            <AccountButton>Save</AccountButton>
                        </AccountContainerLeft>
                        <AccountContainerRight>
                            <Avatar style={{width: '250px', height: '250px', margin: '20px'}} />
                            <h1>{user.name}</h1>
                            <h3 style={{paddingTop: '20px'}}>Do you want to log out?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}} onClick={(e) => handleLogout(e)}>Log out</AccountButton>

                            <h3 style={{paddingTop: '20px'}}>Do you want to delete your account?</h3>
                            <AccountButton style={{backgroundColor: 'grey'}}>Delete account</AccountButton>
                        </AccountContainerRight>
                    </AccountContainer>
                </BodyContainer>
            </SpotifyBody>

        </>  )
}

