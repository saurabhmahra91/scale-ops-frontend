/* eslint-disable react/prop-types */
import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';

export default function MatchesList({ matches, onSelectMatch, selectedMatch }) {
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
                                backgroundColor: 'primary.main',
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