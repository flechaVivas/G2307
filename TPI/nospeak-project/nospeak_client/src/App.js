import './App.css';
import Inicio from './styled-components/Inicio/Inicio';
import Login from './styled-components/Login/Login';
import Player from './styled-components/Player/Player';
import Register from './styled-components/Register/Register';
import Account from './styled-components/Account/Account';
import Playlist from './styled-components/Playlist/Playlist';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: green,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player" element={<Player />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/playlist" element={<Playlist />} />

          </Routes>
        </Router>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
