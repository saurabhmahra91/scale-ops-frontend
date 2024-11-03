import { useEffect, useState } from 'react';
import Landing from './Landing';

import {
    Box,
    Typography,
    LinearProgress,
} from '@mui/material';

import AALink from './AALink';
import Preferences from './Preferences';
import Authentication from './Authentication';


function ProfileCreation(props) {
    const [progress, setProgress] = useState(1);
    const totalNumberOfSteps = 4;
    const signupComponent = (step) => {
        switch (step) {
            case 1:
                return <Authentication setProgress={setProgress}/>;
            case 2:
                return <Landing setProgress={setProgress}/>;
            case 3:
                return <AALink setProgress={setProgress}></AALink>;
            case 4:
                return <Preferences></Preferences>;
            default:
                return null;
        }
    }
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
                    maxWidth: 1000,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="h5" gutterBottom align="left" color="text.primary">
                    Create an account
                </Typography>

                <Box sx={{ width: '100%', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Step {progress} of {totalNumberOfSteps}</Typography>
                        <Typography variant="body2">{parseInt(progress / totalNumberOfSteps * 100)}%</Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={parseInt((progress / totalNumberOfSteps) * 100)}
                    />
                </Box>

                {signupComponent(progress)}

            </Box>
        </Box>
    </>
};


export default ProfileCreation;