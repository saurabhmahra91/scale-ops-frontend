import { useEffect, useState } from 'react';
import Landing from './Landing';

import {
    Box,
    Typography,
    LinearProgress,
} from '@mui/material';

function ProfileCreation() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dob: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleNext = () => {
        // Implement next step logic here
        console.log('Moving to next step');
    };

    useEffect(() => {

        console.log('Form data:', formData);
    }, [formData])


    return <>
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="h5" gutterBottom align="left" color="text.primary">
                    Create Your Profile
                </Typography>

                <Box sx={{ width: '100%', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Step 1 of 3</Typography>
                        <Typography variant="body2">33%</Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={33.33}
                    />
                </Box>

                <Landing formData={formData} handleChange={handleChange} handleNext={handleNext} />
                
            </Box>
        </Box>
    </>
};


export default ProfileCreation;