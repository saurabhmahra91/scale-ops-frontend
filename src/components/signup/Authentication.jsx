import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material';
import api from '../../utils/auth_config';

function Authentication(props) {
    const setProgress = props.setProgress;
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let interval;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    const handleRequestOtp = async () => {
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/request-otp', { mobile });
            setIsOtpSent(true);
            setTimer(30);
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/verify-otp', { mobile, otp });
            const { access_token, refresh_token, token_type } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('token_type', token_type);
            setProgress(2);
        } catch (error) {
            setError('Invalid OTP. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
                Phone verification
            </Typography>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={isOtpSent}
                />
            </Box>
            {!isOtpSent ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRequestOtp}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} /> : 'Get OTP'}
                </Button>
            ) : (
                <>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="OTP"
                            variant="outlined"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                    </Button>
                    <Box mt={2}>
                        <Button
                            variant="text"
                            onClick={handleRequestOtp}
                            disabled={timer > 0 || loading}
                        >
                            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                        </Button>
                    </Box>
                </>
            )}
            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}

export default Authentication;