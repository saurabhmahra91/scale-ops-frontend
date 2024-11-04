import { useState } from 'react';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';

export default function ChatInner({ selectedMatch }) {
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
            <Box sx={{ mt: 2, display: 'flex' }}>
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
        </Box>
    );
}