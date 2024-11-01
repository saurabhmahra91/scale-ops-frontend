import React from 'react'
import { useEffect, useState } from 'react';

import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';


function Landing(props) {
    const formData = props.formData;
    const handleChange = props.handleChange;
    const handleNext = props.handleNext;

    const handleLocationPermission = () => {
        // Implement location permission logic here
        console.log('Requesting location permission');
    };

    return (
        <form>
            <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>


            <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />

            <Button
                fullWidth
                variant="outlined"
                onClick={handleLocationPermission}
                sx={{ mt: 2 }}
            >
                Allow Location Access
            </Button>
            <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 2 }}
            >
                Next
            </Button>
        </form>
    )
}

export default Landing