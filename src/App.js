import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Test from './pages/Test';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import PlayFair from './fonts/PlayfairDisplay-VariableFont_wght.ttf';
import { GlobalProvider } from './context/GlobalContext';
import SignUp from './pages/SignUp';

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: 'Roboto',
            h3: {
                fontFamily: "Oswald",
                fontWeight: 500,
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <GlobalProvider>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/test' element={<Test />} />
                </Routes>
            </GlobalProvider>
        </ThemeProvider>
    );
}

export default App;
