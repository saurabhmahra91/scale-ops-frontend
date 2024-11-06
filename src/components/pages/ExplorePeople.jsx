import React, { useEffect, useState } from 'react'
import {
    Typography,
    CardMedia,
    CardContent,
    CardActionArea,
    Divider,
    Card,
    IconButton,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import FinancialInfo from '../FinancialInfo';
import UserDetails from '../UserDetails';
import {
    ArrowBack,
    ArrowForward,
} from '@mui/icons-material';
import api, { BASE_URL } from '../../utils/auth_config';


export default function ExplorePeople() {
    const [showMatchNotification, setShowMatchNotification] = useState(false);
    const [exhausted, setExhausted] = useState(false);
    const [recommendedUser, setRecommendedUser] = useState({});
    const [userKey, setUserKey] = useState(0); // Add this line


    const fetchRecommendedUser = async () => {
        try {
            const response = await api.get('/engagement/recommend');
            setRecommendedUser(response.data);
            setUserKey(prevKey => prevKey + 1); // Add this line
        } catch (error) {
            console.error('Error fetching random user:', error);
            // Handle the case when no new users are available
            if (error.response && error.response.status === 204) {
                setExhausted(true);
            }
        }
    };

    useEffect(() => {
        console.log('Fetching recommended user', recommendedUser);
    }, [recommendedUser]);

    useEffect(() => { console.log(recommendedUser, "recommended user") }, [recommendedUser])
    useEffect(() => { console.log(recommendedUser, "recommended user") }, [recommendedUser])


    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMatchNotification(false);
    };

    const handleSwipe = async (direction) => {
        if (!recommendedUser) {
            console.log('No more users to swipe');
            return;
        }

        const action = direction === 'right';
        try {
            const response = await api.post(`/engagement/engage/${recommendedUser.id}?action=${action}`);

            if (response.data.mutual_match) {
                setShowMatchNotification(true);
            }
            // Fetch the next user
            await fetchRecommendedUser();
            if (exhausted) {
                console.log('No more users after swipe');
                // You might want to show a message to the user here
            }
        } catch (error) {
            console.error('Error engaging user:', error);
        }
    };


    useEffect(() => {
        fetchRecommendedUser()
    }, []);

    if (exhausted) {
        return (
            <Card sx={{ maxWidth: 600, margin: 'auto', p: 4 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        No more users to recommend at this time.
                    </Typography>
                    <Typography variant="body1" align="center">
                        Check back later for new matches!
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>

            <CardActionArea>
                <CardMedia
                    key={userKey}
                    component="img"
                    sx={{
                        height: 800,
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    // image={BASE_URL + "/"+ recommendedUser.image}
                    image="https://thispersondoesnotexist.com/"
                    alt={recommendedUser.name}
                />
                <CardContent
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        {recommendedUser.name}, {recommendedUser.age}
                    </Typography>
                    <Typography variant="subtitle1">
                        {recommendedUser.city}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardContent>
                <UserDetails user={recommendedUser}></UserDetails>
                <FinancialInfo financialInfo={recommendedUser.financial_info}></FinancialInfo>
            </CardContent>

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <IconButton
                    onClick={() => handleSwipe('left')}
                    sx={{
                        mr: 2,
                        backgroundColor: (theme) => theme.palette.text.secondary,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.text.secondary
                        }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <IconButton
                    onClick={() => handleSwipe('right')}
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.light
                        }
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            <Snackbar
                open={showMatchNotification}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                    It&apos;s a match! You can now chat with this person.
                </Alert>
            </Snackbar>

            <CardContent>
                <Typography variant="h5" align="center">
                    No more users to recommend at this time.
                </Typography>
                <Typography variant="body1" align="center">
                    Check back later for new matches!
                </Typography>
            </CardContent>

        </Card>
    )
};
