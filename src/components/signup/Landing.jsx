import React from 'react'
import { useEffect, useState } from 'react';

import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid2
} from '@mui/material';

import {
    getFormattedGenderEnums,
    getFormattedMaritalStatusEnums,
    getFormattedReligionEnums,
    getFormattedEducationLevelEnums,
    getFormattedFamilyTypeEnums,
    getFormattedDietaryPreferenceEnums,
    getFormattedSmokingHabitEnums,
    getFormattedDrinkingHabitEnums,
    getFormattedNationalityEnums
} from '../../utils/enum_number_to_value';
import api from '../../utils/auth_config';

function Landing(props) {
    const setProgress = props.setProgress;

    const [formData, setFormData] = useState({
        "name": "",
        "dob": "1999-11-30",
        "city": "",
        "nationality": 101,
        "address": "",
        "gender": 1,
        "marital_status": 1,
        "religion": 3,
        "caste_community": "",
        "mother_tongue": "",
        "education_level": 5,
        "college_attended": "",
        "job_title": "",
        "company_name": "",
        "annual_income": 0,
        "family_type": 1,
        "fathers_occupation": "",
        "mothers_occupation": "",
        "siblings": 2,
        "family_values": "",
        "dietary_preference": 2,
        "smoking_habit": 1,
        "drinking_habit": 1,
        "hobbies_interests": ""
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [errors, setErrors] = useState({});


    const HandleChangeInFormData = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        let newErrors = { ...errors };
        switch (name) {
            case 'name':
                if (value.trim() === '') {
                    newErrors.name = 'Name cannot be empty';
                } else {
                    delete newErrors.name;
                }
                break;

        }
        setErrors(newErrors);
    };

    const handleNext = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            try {
                // Step 1: Send JSON data to create the profile
                const response = await api.post('/profile', formData);

                if (response.status === 200) {
                    // Step 2: If profile creation is successful, upload the profile picture
                    if (selectedFile) {
                        const imageFormData = new FormData();
                        imageFormData.append('image', selectedFile);

                        try {
                            const imageResponse = await api.put('/profile/image', imageFormData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });

                            if (imageResponse.status === 200) {
                                console.log('Profile picture uploaded successfully');
                            }
                        } catch (imageError) {
                            console.error('Error uploading profile picture:', imageError);
                            // Handle image upload error (e.g., show error message to user)
                        }
                    }

                    // Move to the next step regardless of image upload success
                    setProgress(previousProgress => previousProgress + 1);
                }
            } catch (error) {
                console.error('Error creating profile:', error);
                // Handle profile creation error (e.g., show error message to user)
            }
        }
    };

    useEffect(() => {

        console.log('Form data:', formData);
    }, [formData])

    const [enums, setEnums] = useState({
        genders: [],
        maritalStatuses: [],
        religions: [],
        educationLevels: [],
        familyTypes: [],
        dietaryPreferences: [],
        smokingHabits: [],
        drinkingHabits: [],
        nationalities: []
    });

    useEffect(() => { console.log("Enums == ", enums) }, [enums])
    const handleLocationPermission = () => {
        // Implement location permission logic here
        console.log('Requesting location permission');
    };

    const renderDropdown = (name, label, options) => (
        <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                value={formData[name] || ''}
                onChange={HandleChangeInFormData}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [
                    genders,
                    maritalStatuses,
                    religions,
                    educationLevels,
                    familyTypes,
                    dietaryPreferences,
                    smokingHabits,
                    drinkingHabits,
                    nationalities
                ] = await Promise.all([
                    getFormattedGenderEnums(),
                    getFormattedMaritalStatusEnums(),
                    getFormattedReligionEnums(),
                    getFormattedEducationLevelEnums(),
                    getFormattedFamilyTypeEnums(),
                    getFormattedDietaryPreferenceEnums(),
                    getFormattedSmokingHabitEnums(),
                    getFormattedDrinkingHabitEnums(),
                    getFormattedNationalityEnums()
                ]);

                setEnums({
                    genders,
                    maritalStatuses,
                    religions,
                    educationLevels,
                    familyTypes,
                    dietaryPreferences,
                    smokingHabits,
                    drinkingHabits,
                    nationalities
                });
            } catch (error) {
                console.error('Error fetching enums:', error);
            }
        };

        fetchEnums();
    }, []);


    const validateForm = () => {
        let newErrors = {};
        if (formData.name.trim() === '') {
            newErrors.name = 'Name cannot be empty';
        }
        return newErrors;
    };


    return (
        <form onSubmit={(e) => { e.preventDefault(); handleNext() }}>
            <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={HandleChangeInFormData}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
            />

            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Profile Picture</Typography>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Select a file
                    </Button>
                </label>
                {selectedFile && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file: {selectedFile.name}
                    </Typography>
                )}
            </Box>

            <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                    {renderDropdown('gender', 'Gender', enums.genders)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('marital_status', 'Marital Status', enums.maritalStatuses)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('religion', 'Religion', enums.religions)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('education_level', 'Education Level', enums.educationLevels)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('family_type', 'Family Type', enums.familyTypes)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('dietary_preference', 'Dietary Preference', enums.dietaryPreferences)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('smoking_habit', 'Smoking Habit', enums.smokingHabits)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('drinking_habit', 'Drinking Habit', enums.drinkingHabits)}
                </Grid2>
                <Grid2 item size={12}>
                    {renderDropdown('nationality', 'Nationality', enums.nationalities)}
                </Grid2>
            </Grid2>


            <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={HandleChangeInFormData}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Caste/Community"
                name="caste_community"
                placeholder="Brahmin"
                value={formData.caste_community}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mother Tongue"
                name="mother_tongue"
                placeholder="English, Hindi"
                value={formData.mother_tongue}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="College Attended"
                name="college_attended"
                placeholder="Indian Institute of Science Education and Research Bhopal"
                value={formData.college_attended}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                placeholder="Software Engineer"
                value={formData.job_title}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Company Name"
                name="company_name"
                placeholder="Microsoft"
                value={formData.company_name}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Annual Income in (INR)"
                name="annual_income"
                type="number"
                value={formData.annual_income}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Father's Occupation"
                name="fathers_occupation"
                placeholder="Doctor"
                value={formData.fathers_occupation}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mother's Occupation"
                placeholder="Doctor"
                name="mothers_occupation"
                value={formData.mothers_occupation}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Number of Siblings"
                name="siblings"
                type="number"
                value={formData.siblings}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Family Values"
                name="family_values"
                placeholder="Financially conservative, Spiritualists"
                value={formData.family_values}
                onChange={HandleChangeInFormData}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Hobbies and Interests"
                name="hobbies_interests"
                value={formData.hobbies_interests}
                onChange={HandleChangeInFormData}
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