import './App.css';
import Inicio from './pages/Inicio/Inicio';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Playlist from './pages/Playlist/Playlist';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA130'
    },
  },
});


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login client={client}  setCurrentUser={setCurrentUser} 
            email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register client={client} setCurrentUser={setCurrentUser} 
            email={email} setEmail={setEmail} password={password} setPassword={setPassword} username={username} setUsername={setUsername} />} />
            <Route path="/account" element={<Account client={client} setCurrentUser={setCurrentUser} 
            email={email} setEmail={setEmail} password={password} setPassword={setPassword} username={username} setUsername={setUsername}/>} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
