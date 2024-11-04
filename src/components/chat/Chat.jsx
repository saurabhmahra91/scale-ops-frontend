
import React, { useState } from 'react';
import { Box, CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Paper, Typography, TextField } from '@mui/material';
import ChatInner from './ChatInner';
import MatchesList from './MatchesList';


// Existing ChatInner component (no changes)


function Chat() {
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([
        { id: 1, name: 'John Doe', avatar: '/path/to/avatar1.jpg', lastMessage: 'Hey, how are you?' },
        { id: 2, name: 'Jane Smith', avatar: '/path/to/avatar2.jpg', lastMessage: 'See you tomorrow!' },
        // Add more matches as needed
    ]);
    const [selectedMatch, setSelectedMatch] = useState(null);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Box sx={{ display: 'flex', height: '95vh' }}>
                <Box sx={{ width: 360, borderRight: 1, borderColor: 'divider' }}>
                    <MatchesList
                        matches={matches}
                        onSelectMatch={setSelectedMatch}
                        selectedMatch={selectedMatch}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    {selectedMatch ? (
                        <ChatInner selectedMatch={selectedMatch} />
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            Select a match to start chatting
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default Chat;