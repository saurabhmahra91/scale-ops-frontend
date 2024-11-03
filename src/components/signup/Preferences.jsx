import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Grid2,
    Box,
} from '@mui/material';
import api from '../../utils/auth_config';
import { getFormattedMaritalStatusEnums, getFormattedReligionEnums, getFormattedNationalityEnums, getFormattedEducationLevelEnums } from '../../utils/enum_number_to_value';


function Preferences() {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState({
        min_age: 18,
        max_age: 80,
        min_height_centimeters: 50,
        max_height_centimeters: 250,
        preferred_marital_status: "",
        preferred_religion: "",
        preferred_communities: [],
        preferred_mother_tongues: [],
        preferred_education_levels: [],
        preferred_occupations: [],
        preferred_countries: [101],
        willing_to_relocate: false,
    });

    const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
    const [religionOptions, setReligionOptions] = useState([]);
    const [educationLevelOptions, setEducationLevelOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        fetchOptions();
        fetchMaritalStatusOptions();
        fetchReligionOptions();
        fetchEducationLevelOptions();
        fetchCountryOptions();

    }, []);

    const fetchOptions = async () => {
        try {
            const response = await api.get('/preferences/me');
            console.log('Fetched options:', response.data);
            setPreferences(response.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };


    const fetchMaritalStatusOptions = async () => {
        try {
            const options = await getFormattedMaritalStatusEnums();
            setMaritalStatusOptions(options);
        } catch (error) {
            console.error('Error fetching marital status options:', error);
        }
    };

    const fetchReligionOptions = async () => {
        try {
            const options = await getFormattedReligionEnums();
            setReligionOptions(options);
        } catch (error) {
            console.error('Error fetching religion options:', error);
        }
    };

    const fetchEducationLevelOptions = async () => {
        try {
            const options = await getFormattedEducationLevelEnums();
            setEducationLevelOptions(options);
        } catch (error) {
            console.error('Error fetching education level options:', error);
        }
    };

    const fetchCountryOptions = async () => {
        try {
            const options = await getFormattedNationalityEnums();
            setCountryOptions(options);
        } catch (error) {
            console.error('Error fetching country options:', error);
        }
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
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
            <Grid2 container spacing={3}>
                <Grid2 item size={6}>
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
                </Grid2>
                <Grid2 item size={6}>
                    <Typography gutterBottom>Height Range (cm)</Typography>
                    <Slider
                        value={[preferences.min_height_centimeters, preferences.max_height_centimeters]}
                        onChange={(event, newValue) => {
                            setPreferences({ ...preferences, min_height_centimeters: newValue[0], max_height_centimeters: newValue[1] });
                        }}
                        valueLabelDisplay="auto"
                        min={50}
                        max={250}
                    />
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Marital Status</InputLabel>
                        <Select
                            name="preferred_marital_status"
                            value={preferences.preferred_marital_status}
                            onChange={handleChange}
                            label="Preferred Marital Status"
                        >
                            {maritalStatusOptions.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                   <FormControl fullWidth margin="normal">
                       <InputLabel>Preferred Religion</InputLabel>
                       <Select
                           name="preferred_religion"
                           value={preferences.preferred_religion}
                           onChange={handleChange}
                           label="Preferred Religion"
                       >
                           {religionOptions.map((religion) => (
                               <MenuItem key={religion.value} value={religion.value}>
                                   {religion.name}
                               </MenuItem>
                           ))}
                       </Select>
                   </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Communities</InputLabel>
                        <Select
                            multiple
                            name="preferred_communities"
                            value={preferences.preferred_communities}
                            onChange={handleMultipleChange}
                            label="Preferred Communities"
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {preferences.preferred_communities.map((community) => (
                                <MenuItem key={community} value={community}>
                                    <Checkbox checked={preferences.preferred_communities.indexOf(community) > -1} />
                                    <Typography>{community}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Mother Tongues</InputLabel>
                        <Select
                            multiple
                            name="preferred_mother_tongues"
                            value={preferences.preferred_mother_tongues}
                            onChange={handleMultipleChange}
                            label="Preferred Mother Tongues"
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {preferences.preferred_mother_tongues.map((language) => (
                                <MenuItem key={language} value={language}>
                                    <Checkbox checked={preferences.preferred_mother_tongues.indexOf(language) > -1} />
                                    <Typography>{language}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Education Levels</InputLabel>
                        <Select
                            multiple
                            name="preferred_education_levels"
                            value={preferences.preferred_education_levels}
                            onChange={handleMultipleChange}
                            label="Preferred Education Levels"
                            renderValue={(selected) => selected.map(value => 
                                educationLevelOptions.find(option => option.value === value)?.name
                            ).join(', ')}
                        >
                            {educationLevelOptions.map((level) => (
                                <MenuItem key={level.value} value={level.value}>
                                    <Checkbox checked={preferences.preferred_education_levels.indexOf(level.value) > -1} />
                                    <Typography>{level.name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Occupations</InputLabel>
                        <Select
                            multiple
                            name="preferred_occupations"
                            value={preferences.preferred_occupations}
                            onChange={handleMultipleChange}
                            label="Preferred Occupations"
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {preferences.preferred_occupations.map((occupation) => (
                                <MenuItem key={occupation} value={occupation}>
                                    <Checkbox checked={preferences.preferred_occupations.indexOf(occupation) > -1} />
                                    <Typography>{occupation}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Preferred Countries</InputLabel>
                        <Select
                            multiple
                            name="preferred_countries"
                            value={preferences.preferred_countries}
                            onChange={handleMultipleChange}
                            label="Preferred Countries"
                            renderValue={(selected) => selected.map(value => 
                                countryOptions.find(option => option.value === value)?.name
                            ).join(', ')}
                        >
                            {countryOptions.map((country) => (
                                <MenuItem key={country.value} value={country.value}>
                                    <Checkbox checked={preferences.preferred_countries.indexOf(country.value) > -1} />
                                    <Typography>{country.name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item size={4}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={preferences.willing_to_relocate}
                                    onChange={(e) => setPreferences({ ...preferences, willing_to_relocate: e.target.checked })}
                                    name="willing_to_relocate"
                                />
                            }
                            label="Willing to Relocate"
                        />
                    </FormGroup>
                </Grid2>
                <Grid2 item size={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Save Preferences
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Preferences;