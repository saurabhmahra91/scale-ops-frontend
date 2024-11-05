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
    const [recommendedUser, setRecommendedUser] = useState({
        id: 1,
        name: "Jane Doe",
        age: "25",
        city: "New York, NY",
        image: "https://st.depositphotos.com/25375842/53619/i/450/depositphotos_536197002-stock-photo-portrait-very-beautiful-attractive-indian.jpg",
        gender: "Female",
        marital_status: "Single",
        nationality: "American",
        mother_tongue: "English",
        education_level: "Master's Degree",
        college_attended: "Columbia University",
        job_title: "Software Engineer",
        company_name: "Tech Corp",
        annual_income: 80000,
        family_type: "Nuclear",
        fathers_occupation: "Doctor",
        mothers_occupation: "Teacher",
        siblings: 2,
        family_values: "Traditional",
        dietary_preference: "Vegetarian",
        smoking_habit: "Non-smoker",
        drinking_habit: "Occasionally",
        hobbies_interests: ["Reading", "Hiking", "Photography"],
        financial_info: [
            {
                category: "Income Patterns",
                parameters: [
                    {
                        name: "average_monthly_net_income",
                        type: "decimal",
                        representative_text: "Earns $8,000 per month",
                        additional_text: "After taxes and deductions",
                        icon: "Wallet"
                    },
                    {
                        name: "income_stability",
                        type: "enum",
                        representative_text: "Has stable income pattern",
                        additional_text: "Based on consistency of deposits",
                        icon: "Shield"
                    }
                ]
            },
            {
                category: "Savings Behavior",
                parameters: [
                    {
                        name: "monthly_savings_rate",
                        type: "decimal",
                        representative_text: "Saves 20% of monthly income",
                        additional_text: "Consistent monthly savings",
                        icon: "PiggyBank"
                    },
                    {
                        name: "has_emergency_fund",
                        type: "bool",
                        representative_text: "Has emergency fund",
                        additional_text: "Minimum 6 months of expenses",
                        icon: "Umbrella"
                    }
                ]
            },
            {
                category: "Investment Activities",
                parameters: [
                    {
                        name: "portfolio_diversity_score",
                        type: "enum",
                        representative_text: "Has high investment diversity",
                        additional_text: "Across different asset classes",
                        icon: "LineChart"
                    }
                ]
            },
            {
                category: "Lifestyle Indicators",
                parameters: [
                    {
                        name: "travel_spending_level",
                        type: "enum",
                        representative_text: "Has moderate travel spending",
                        additional_text: "Annual vacation and travel expenses",
                        icon: "Plane"
                    },
                    {
                        name: "entertainment_budget",
                        type: "decimal",
                        representative_text: "Spends $500 on entertainment monthly",
                        additional_text: "Including dining and activities",
                        icon: "Film"
                    }
                ]
            }
        ]
    });


    const fetchRecommendedUser = async () => {
        try {
            const response = await api.get('/engagement/recommend');
            setRecommendedUser(response.data);
        } catch (error) {
            console.error('Error fetching random user:', error);
            // Handle the case when no new users are available
            if (error.response && error.response.status === 204) {
                setExhausted(true);
            }
        }
    };

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
