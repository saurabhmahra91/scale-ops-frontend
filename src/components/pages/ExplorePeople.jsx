import React, { useState } from 'react'
import {
    Typography,
    CardMedia,
    CardContent,
    CardActionArea,
    Divider,
    Card,
    IconButton,
    Box
} from '@mui/material';
import FinancialInfo from '../FinancialInfo';
import UserDetails from '../UserDetails';
import {
    ArrowBack,
    ArrowForward,
} from '@mui/icons-material';
export default function ExplorePeople() {
    const [currentMatch, setCurrentMatch] = useState({
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
                    image={currentMatch.image}
                    alt={currentMatch.name}
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
                        {currentMatch.name}, {currentMatch.age}
                    </Typography>
                    <Typography variant="subtitle1">
                        {currentMatch.city}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardContent>
                <UserDetails user={currentMatch}></UserDetails>
                <FinancialInfo financialInfo={currentMatch.financial_info}></FinancialInfo>
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

        </Card>
    )
};
