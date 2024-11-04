import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
    Collapse,
    Alert
} from '@mui/material';
import api from '../../utils/auth_config';
import {
    getMaritalStatusEnums,
    getReligionEnums,
    getNationalityEnums,
    getEducationLevelEnums,
    getLanguageEnums,
    getProfessionEnums,
    getGenderEnums,
    getFamilyTypeEnums,
    getDietaryPreferenceEnums,
    getSmokingHabitEnums,
    getDrinkingHabitEnums,
    getCasteCommunityEnums,
    getFamilyValueEnums,
    getHobbyEnums
} from '../../utils/enum_number_to_value';
import { Autocomplete } from '@mui/material';



function Preferences() {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(true);
    const [preferences, setPreferences] = useState({
        min_age: 18,
        max_age: 80,
        min_height_centimeters: 150,
        max_height_centimeters: 200,
        gender: null,
        marital_statuses: [],
        religion: null,
        education_levels: [],
        family_types: [],
        dietary_preferences: [],
        smoking_habits: [],
        drinking_habits: [],
        caste_communities: [],
        mother_tongue: null,
        profession: null,
        family_values: [],
        hobbies: [],
        nationality: null,
        willing_to_relocate: false,
    });

    const [enums, setEnums] = useState({
        marital_status: [],
        religion: [],
        education_level: [],
        countries: [],
        languages: [],
        occupations: [],
        gender: [],
        family_type: [],
        dietary_preference: [],
        smoking_habit: [],
        drinking_habit: [],
        caste_community: [],
        family_values: [],
        hobbies: []
    });

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [
                    marital_status,
                    religion,
                    education_level,
                    countries,
                    languages,
                    occupations,
                    gender,
                    family_type,
                    dietary_preference,
                    smoking_habit,
                    drinking_habit,
                    caste_community,
                    family_values,
                    hobbies
                ] = await Promise.all([
                    getMaritalStatusEnums(),
                    getReligionEnums(),
                    getEducationLevelEnums(),
                    getNationalityEnums(),
                    getLanguageEnums(),
                    getProfessionEnums(),
                    getGenderEnums(),
                    getFamilyTypeEnums(),
                    getDietaryPreferenceEnums(),
                    getSmokingHabitEnums(),
                    getDrinkingHabitEnums(),
                    getCasteCommunityEnums(),
                    getFamilyValueEnums(),
                    getHobbyEnums()
                ]);

                setEnums({
                    marital_status,
                    religion,
                    education_level,
                    countries,
                    languages,
                    occupations,
                    gender,
                    family_type,
                    dietary_preference,
                    smoking_habit,
                    drinking_habit,
                    caste_community,
                    family_values,
                    hobbies
                });
            } catch (error) {
                console.error('Error fetching enums:', error);
            }
        };

        fetchEnums();
        fetchPreferences();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSuccessMessage(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const fetchPreferences = async () => {
        try {
            const response = await api.get('/preferences/me');
            console.log('from backend', response);

            // Create a new object with the response data
            const fetchedPreferences = response.data;

            // Populate multiple select fields with empty arrays if they're null
            const multipleSelectFields = [
                'marital_statuses', 'education_levels', 'family_types',
                'dietary_preferences', 'smoking_habits', 'drinking_habits',
                'caste_communities', 'family_values', 'hobbies'
            ];

            multipleSelectFields.forEach(field => {
                if (fetchedPreferences[field] === null) {
                    fetchedPreferences[field] = [];
                }
            });

            // Update the preferences state
            setPreferences(fetchedPreferences);
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    const handleChange = (name, value) => {
        setPreferences({ ...preferences, [name]: value });
    };

    const handleMultipleChange = (event) => {
        const { name, value } = event.target;
        setPreferences({ ...preferences, [name]: typeof value === 'string' ? value.split(',') : value });
    };

    const handleSubmit = async () => {
        try {
            await api.post('/preferences/me', { ...preferences });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Matchmaking Preferences
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: "column", gap: 3 }}>
                <Box sx={{ width: { xs: '100%' } }}>
                    <Typography gutterBottom>Age Range</Typography>
                    <Slider
                        value={[preferences.min_age, preferences.max_age]}
                        onChange={(event, newValue) => {
                            setPreferences({ ...preferences, min_age: newValue[0], max_age: newValue[1] });
                        }}
                        valueLabelDisplay="auto"
                        min={18}
                        max={80}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%' } }}>
                    <Typography gutterBottom>Height Range (cm)</Typography>
                    <Slider
                        value={[preferences.min_height_centimeters, preferences.max_height_centimeters]}
                        onChange={(event, newValue) => {
                            setPreferences({ ...preferences, min_height_centimeters: newValue[0], max_height_centimeters: newValue[1] });
                        }}
                        valueLabelDisplay="auto"
                        min={150}
                        max={200}
                    />
                </Box>


                <Autocomplete
                    options={enums.gender}
                    value={preferences.gender}
                    onChange={(event, newValue) => handleChange('gender', newValue)}
                    renderInput={(params) => <TextField {...params} label="Gender" />}
                />

                <Autocomplete
                    multiple
                    options={enums.marital_status}
                    value={preferences.marital_statuses}
                    onChange={(event, newValue) => handleChange('marital_statuses', newValue)}
                    renderInput={(params) => <TextField {...params} label="Marital Status" />}
                />

                <Autocomplete
                    options={enums.religion}
                    value={preferences.religion}
                    onChange={(event, newValue) => handleChange('religion', newValue)}
                    renderInput={(params) => <TextField {...params} label="Religion" />}
                />

                <Autocomplete
                    multiple
                    options={enums.education_level}
                    value={preferences.education_levels}
                    onChange={(event, newValue) => handleChange('education_levels', newValue)}
                    renderInput={(params) => <TextField {...params} label="Education Levels" />}
                />

                <Autocomplete
                    multiple
                    options={enums.family_type}
                    value={preferences.family_types}
                    onChange={(event, newValue) => handleChange('family_types', newValue)}
                    renderInput={(params) => <TextField {...params} label="Family Types" />}
                />

                <Autocomplete
                    multiple
                    options={enums.dietary_preference}
                    value={preferences.dietary_preferences}
                    onChange={(event, newValue) => handleChange('dietary_preferences', newValue)}
                    renderInput={(params) => <TextField {...params} label="Dietary Preferences" />}
                />

                <Autocomplete
                    multiple
                    options={enums.smoking_habit}
                    value={preferences.smoking_habits}
                    onChange={(event, newValue) => handleChange('smoking_habits', newValue)}
                    renderInput={(params) => <TextField {...params} label="Smoking Habits" />}
                />

                <Autocomplete
                    multiple
                    options={enums.drinking_habit}
                    value={preferences.drinking_habits}
                    onChange={(event, newValue) => handleChange('drinking_habits', newValue)}
                    renderInput={(params) => <TextField {...params} label="Drinking Habits" />}
                />

                <Autocomplete
                    multiple
                    options={enums.caste_community}
                    value={preferences.caste_communities}
                    onChange={(event, newValue) => handleChange('caste_communities', newValue)}
                    renderInput={(params) => <TextField {...params} label="Caste/Community" />}
                />

                <Autocomplete
                    options={enums.languages}
                    value={preferences.mother_tongue}
                    onChange={(event, newValue) => handleChange('mother_tongue', newValue)}
                    renderInput={(params) => <TextField {...params} label="Mother Tongue" />}
                />

                <Autocomplete
                    options={enums.occupations}
                    value={preferences.profession}
                    onChange={(event, newValue) => handleChange('profession', newValue)}
                    renderInput={(params) => <TextField {...params} label="Profession" />}
                />

                <Autocomplete
                    multiple
                    options={enums.family_values}
                    value={preferences.family_values}
                    onChange={(event, newValue) => handleChange('family_values', newValue)}
                    renderInput={(params) => <TextField {...params} label="Family Values" />}
                />

                <Autocomplete
                    multiple
                    options={enums.hobbies}
                    value={preferences.hobbies}
                    onChange={(event, newValue) => handleChange('hobbies', newValue)}
                    renderInput={(params) => <TextField {...params} label="Hobbies" />}
                />

                <Autocomplete
                    options={enums.countries}
                    value={preferences.nationality}
                    onChange={(event, newValue) => handleChange('nationality', newValue)}
                    renderInput={(params) => <TextField {...params} label="Nationality" />}
                />



                <Box sx={{ width: '100%' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.willing_to_relocate}
                                onChange={(e) => setPreferences({ ...preferences, willing_to_relocate: e.target.checked })}
                                name="willing_to_relocate"
                            />
                        }
                        label="Willing to relocate"
                    />
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save Preferences
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Preferences;