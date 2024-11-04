
import React, { useState } from 'react';
import { Box, CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Paper, Typography, TextField } from '@mui/material';
import SideDrawerLayout from './SideDrawerLayout';


function MatchesList({ matches, onSelectMatch, selectedMatch }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {matches.map((match, index) => (
                <React.Fragment key={match.id}>
                    <ListItem
                        alignItems="flex-start"
                        button
                        selected={selectedMatch && selectedMatch.id === match.id}
                        onClick={() => onSelectMatch(match)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'primary.light',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar alt={match.name} src={match.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={match.name}
                            secondary={match.lastMessage}
                        />
                    </ListItem>
                    {index < matches.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
}

// Existing ChatInner component (no changes)
function ChatInner({ selectedMatch }) {

    const [messages, setMessages] = useState([
        { text: "Hey there!", sender: 'other' },
        { text: "Hi! How are you?", sender: 'user' },
        { text: "I'm doing great, thanks for asking. How about you?", sender: 'other' },
        { text: "I'm good too. What have you been up to lately?", sender: 'user' },
        { text: "Just working on some exciting projects. How about we catch up soon?", sender: 'other' },
    ]);

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { text: inputMessage, sender: 'user' }]);
            setInputMessage('');
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 2,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            mb: 1,
                            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}
                    >
                        <Paper
                            elevation={1}
                            sx={{
                                p: 1,
                                backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5'
                            }}
                        >
                            <Typography>{message.text}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Paper>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ ml: 1 }}
                >
                    Send
                </Button>
            </Box>



            {/* ... (rest of the ChatInner component remains the same) ... */}
        </Box>
    );
}

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
        <SideDrawerLayout>
            <Box sx={{ display: 'flex', height: '100%' }}>
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
        </SideDrawerLayout>
    );
}

export default Chat;