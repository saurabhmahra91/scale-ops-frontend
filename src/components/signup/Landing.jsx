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
    Grid2,
    Autocomplete
} from '@mui/material';

import {
    getGenderEnums,
    getMaritalStatusEnums,
    getReligionEnums,
    getEducationLevelEnums,
    getFamilyTypeEnums,
    getDietaryPreferenceEnums,
    getSmokingHabitEnums,
    getDrinkingHabitEnums,
    getNationalityEnums,
    getCasteCommunityEnums,
    getLanguageEnums,
    getCollegeEnums,
    getProfessionEnums,
    getFamilyValueEnums,
    getHobbyEnums,
    
} from '../../utils/enum_number_to_value';


import api from '../../utils/auth_config';
import validateForm from '../../validations/profileCreation';

function Landing(props) {
    const setProgress = props.setProgress;

    const [formData, setFormData] = useState({
        "name": "",
        "dob": "1999-11-30",
        "city": "",
        "bio": "",
        "height": 170,
        "nationality": "India",
        "address": "",
        "gender": "Female",
        "marital_status": "Never Married",
        "religion": "Atheistic",
        "caste_community": "Brahmin",
        "mother_tongue": "Hindi",
        "education_level": "Post Doctoral",
        "college_attended": "Birla Institute of Technology and Science",
        "job_title": "Software Engineer",
        "company_name": "Microsoft",
        "annual_income": 0,
        "family_type": "Joint Family",
        "fathers_occupation": "Accountant",
        "mothers_occupation": "Respiratory Therapist",
        "siblings": 2,
        "family_values": "Progressive",
        "dietary_preference": "Omnivore",
        "smoking_habit": "Non Smoker",
        "drinking_habit": "Occasional Drinker",
        "hobbies_interests": []
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


    const uploadProfilePicture = async () => {
        if (!selectedFile) return;

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
    };

    const createProfile = async () => {
        try {
            const response = await api.post('/profile', formData);
            return response.status === 200;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    };

    const handleNext = async () => {
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const profileCreated = await createProfile();
            if (profileCreated) {
                await uploadProfilePicture();
                setProgress(previousProgress => previousProgress + 1);
            }
        } catch (error) {
            // Handle profile creation error (e.g., show error message to user)
            console.error('Error in profile creation process:', error);
        }
    };

    useEffect(() => {

        console.log('Form data:', formData);
    }, [formData])

    const [enums, setEnums] = useState({
        gender: [],
        marital_status: [],
        religion: [],
        education_level: [],
        family_type: [],
        dietary_preference: [],
        smoking_habit: [],
        drinking_habit: [],
        nationality: [],
        caste_community: [],
        mother_tongue: [],
        college_attended: [],
        job_title: [],
        fathers_occupation: [],
        mothers_occupation: [],
        family_values: [],
        hobbies_interests: []
    });

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [
                    gender,
                    marital_status,
                    religion,
                    education_level,
                    family_type,
                    dietary_preference,
                    smoking_habit,
                    drinking_habit,
                    nationality,
                    caste_community,
                    mother_tongue,
                    college_attended,
                    profession,
                    family_values,
                    hobbies_interests
                ] = await Promise.all([
                    getGenderEnums(),
                    getMaritalStatusEnums(),
                    getReligionEnums(),
                    getEducationLevelEnums(),
                    getFamilyTypeEnums(),
                    getDietaryPreferenceEnums(),
                    getSmokingHabitEnums(),
                    getDrinkingHabitEnums(),
                    getNationalityEnums(),
                    getCasteCommunityEnums(),
                    getLanguageEnums(),
                    getCollegeEnums(),
                    getProfessionEnums(),
                    getFamilyValueEnums(),
                    getHobbyEnums()
                ]);

                setEnums({
                    gender,
                    marital_status,
                    religion,
                    education_level,
                    family_type,
                    dietary_preference,
                    smoking_habit,
                    drinking_habit,
                    nationality,
                    caste_community,
                    mother_tongue,
                    college_attended,
                    job_title: profession,
                    fathers_occupation: profession,
                    mothers_occupation: profession,
                    family_values,
                    hobbies_interests
                });
            } catch (error) {
                console.error('Error fetching enums:', error);
            }
        };

        fetchEnums();
    }, []);

    useEffect(() => { console.log("Enums == ", enums) }, [enums])

    const handleLocationPermission = () => {
        // Implement location permission logic here
        console.log('Requesting location permission');
    };


    const renderDropdown = (name, label, options) => (
        <FormControl fullWidth margin="normal">
            <Autocomplete
                disablePortal
                id={`autocomplete-${name}`}
                options={options}
                value={formData[name] || null}
                onChange={(event, newValue) => {
                    HandleChangeInFormData({
                        target: { name, value: newValue }
                    });
                }}
                renderInput={(params) => <TextField {...params} label={label} />}
                isOptionEqualToValue={(option, value) => option === value}
            />
        </FormControl>
    );




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

            <TextField
                fullWidth
                label="Tell people about you"
                name="bio"
                value={formData.bio}
                onChange={HandleChangeInFormData}
                margin="normal"
                error={!!errors.bio}
                helperText={errors.bio}
            />


            <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                    {renderDropdown('gender', 'Gender', enums.gender)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('marital_status', 'Marital Status', enums.marital_status)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('religion', 'Religion', enums.religion)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('education_level', 'Education Level', enums.education_level)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('family_type', 'Family Type', enums.family_type)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('dietary_preference', 'Dietary Preference', enums.dietary_preference)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('smoking_habit', 'Smoking Habit', enums.smoking_habit)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('drinking_habit', 'Drinking Habit', enums.drinking_habit)}
                </Grid2>
                <Grid2 item size={12}>
                    {renderDropdown('nationality', 'Nationality', enums.nationality)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('caste_community', 'Caste/Community', enums.caste_community)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('mother_tongue', 'Mother Tongue', enums.mother_tongue)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('college_attended', 'College Attended', enums.college_attended)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('job_title', 'Job Title', enums.job_title)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('fathers_occupation', "Father's Occupation", enums.fathers_occupation)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('mothers_occupation', "Mother's Occupation", enums.mothers_occupation)}
                </Grid2>
                <Grid2 item size={4}>
                    {renderDropdown('family_values', 'Family Values', enums.family_values)}
                </Grid2>
                <Grid2 item size={12}>
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            multiple
                            id="autocomplete-hobbies-interests"
                            options={enums.hobbies_interests}
                            value={formData.hobbies_interests}
                            onChange={(event, newValue) => {
                                HandleChangeInFormData({
                                    target: { name: 'hobbies_interests', value: newValue }
                                });
                            }}
                            renderInput={(params) => <TextField {...params} label="Hobbies and Interests" />}
                            isOptionEqualToValue={(option, value) => option === value}
                        />
                    </FormControl>
                </Grid2>

            </Grid2>

            <TextField
                fullWidth
                label="Height (in cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={HandleChangeInFormData}
                margin="normal"
            />

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
                label="Number of Siblings"
                name="siblings"
                type="number"
                value={formData.siblings}
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