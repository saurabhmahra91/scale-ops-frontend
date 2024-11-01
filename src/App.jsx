import React from 'react';
import ProfileCreation from './components/ProfileCreation/ProfileCreation';
import { ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

function App() {
    return (

        <ThemeProvider theme={theme}>
           <ProfileCreation/>
        </ThemeProvider>
    );
}

export default App;