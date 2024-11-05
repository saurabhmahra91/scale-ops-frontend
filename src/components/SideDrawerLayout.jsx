import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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

export default function SideDrawerLayout() {

    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState('');

    if (!localStorage.getItem('access_token')) {
        navigate('/');
        return null;
    }
    
    useEffect(() => {
        // Update selected item based on current route
        const path = location.pathname;
        if (path === '/') setSelectedItem('Home');
        else if (path === '/profile') setSelectedItem('Profile');
        else if (path === '/chat') setSelectedItem('Matches');
        else if (path === '/settings') setSelectedItem('Settings');
        else if (path === '/preferences') setSelectedItem('Match Preferences');
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_type');
        navigate('/');
    };

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Profile', icon: <Person />, path: '/profile' },
        { text: 'Matches', icon: <Chat />, path: '/chat' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
        { text: 'Match Preferences', icon: <Tune />, path: '/preferences' },
    ];
    const bottomMenuItems = [
        { text: 'Terms of Service', icon: <Description />, path: '/terms' },
        { text: 'Privacy Policy', icon: <PrivacyTip />, path: '/privacy' },
        { text: 'Logout', icon: <ExitToApp />, onClick: handleLogout },
    ];

    const handleItemClick = (text, path) => {
        setSelectedItem(text);
        if (path) navigate(path);
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
                            onClick={() => handleItemClick(item.text, item.path)}
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
                            onClick={item.onClick || (() => handleItemClick(item.text, item.path))}
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
                <Outlet />
            </Box>
        </Box>
    );
}