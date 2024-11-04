import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    useTheme,
    Typography
} from '@mui/material';
import {
    Home,
    Person,
    Chat,
    Settings,
    Tune,
    Description,
    PrivacyTip,
    ExitToApp,
    Favorite,
} from '@mui/icons-material';

export default function SideDrawerLayout({ children }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState('Home');

    const handleLogout = () => {
        // Clear access and refresh tokens from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_type');

        // Navigate to the Default component
        navigate('/default');
    };

    const menuItems = [
        { text: 'Home', icon: <Home /> },
        { text: 'Profile', icon: <Person /> },
        { text: 'Matches', icon: <Chat /> },
        { text: 'Settings', icon: <Settings /> },
        { text: 'Match Preferences', icon: <Tune /> },
    ];
    const bottomMenuItems = [
        { text: 'Terms of Service', icon: <Description /> },
        { text: 'Privacy Policy', icon: <PrivacyTip /> },
        { text: 'Logout', icon: <ExitToApp />, onClick: handleLogout },
    ];

    const handleItemClick = (text) => {
        setSelectedItem(text);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                    <Favorite sx={{ color: theme.palette.primary.main, marginRight: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MatchMaker
                    </Typography>
                </Box>
                <Divider />

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => handleItemClick(item.text)}
                            sx={{
                                backgroundColor: selectedItem === item.text ? theme.palette.primary.main : 'transparent',
                                color: selectedItem === item.text ? theme.palette.primary.contrastText : 'inherit',
                                '&:hover': {
                                    backgroundColor: selectedItem === item.text ? theme.palette.primary.dark : theme.palette.action.hover,
                                },
                            }}
                        >
                            {item.icon}
                            <ListItemText primary={item.text} sx={{ ml: 2 }} />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <List>
                    {bottomMenuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={item.onClick || (() => handleItemClick(item.text))}
                            sx={{
                                backgroundColor: selectedItem === item.text ? theme.palette.primary.main : 'transparent',
                                color: selectedItem === item.text ? theme.palette.primary.contrastText : 'inherit',
                                '&:hover': {
                                    backgroundColor: selectedItem === item.text ? theme.palette.primary.dark : theme.palette.action.hover,
                                },
                            }}
                        >
                            {item.icon}
                            <ListItemText primary={item.text} sx={{ ml: 2 }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}