import { useEffect, useState } from 'react';
import Landing from './Landing';
import ProfileDetails from './ProfileDetails';

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
    const [formDataStep2, setFormDataStep2] = useState({
        a: '',
        b: '',
        c: '',
        d: '',
    });

    const [step, setStep] = useState(1);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        setFormDataStep2(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleNext = () => {
        // Implement next step logic here
        setStep(2);
        console.log('Moving to next step');
    };

    const handleEdit = () => {
        setStep(1);
        console.log('handle Edit here')
    };

    const handleSubmit = () => {
        console.log('Submitting form data:', formDataStep2);
        // Add your submission logic here
    };

    useEffect(() => {

        console.log('Form data:', formData);
    }, [formData])

    useEffect(() => {

        console.log('Next Step 2 Form data:', setFormDataStep2);
    }, [setFormDataStep2])

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
                        {step === 1 && (
                        <>
                            <Typography variant="h5" gutterBottom align="left" color="text.primary">
                                Create Your Profile
                            </Typography>
                            <Box sx={{ width: '100%', mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Step 1 of 3</Typography>
                                    <Typography variant="body2">33%</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={33.33} />
                            </Box>
                            <Landing formData={formData} handleChange={handleChange} handleNext={handleNext} />
                        </>
                    )}
                    {step === 2 && (
                        <>
                        <Typography variant="h5" gutterBottom align="left" color="text.primary">
                                One More Step
                            </Typography>
                            <Box sx={{ width: '100%', mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Step 2 of 3</Typography>
                                    <Typography variant="body2">66%</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={66.66} />
                            </Box>
                        <ProfileDetails formDataStep2={formDataStep2} handleEdit={handleEdit} handleSubmit={handleSubmit} />
                        </>
                    )}
            </Box>
        </Box>
    </>
    // Similarly Can Create Step 3 ; then send data to final submit
    
};


export default ProfileCreation;