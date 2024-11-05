import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCreation from './components/signup/ProfileCreation';
import { ThemeProvider, createTheme } from '@mui/material';
import Chat from './components/chat/Chat';
import Default from './components/Default';
// Assuming you have a Dashboard component, if not, you'll need to create one
import Dashboard from './components/Dashboard'; // You'll need to create this file
import SideDrawerLayout from './components/SideDrawerLayout';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff784b',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#808080',
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

const WithSideDrawer = ({ children }) => (
    <SideDrawerLayout>{children}</SideDrawerLayout>
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route element={<WithSideDrawer />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/chat" element={<Chat />} />
                    </Route>
                    <Route path="/signup" element={<ProfileCreation />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;