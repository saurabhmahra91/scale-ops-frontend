import {
    Box,
    Typography,
    Paper,
} from '@mui/material';
import { Work, School, Language, FamilyRestroom, Restaurant, SportsBar, SmokingRooms, SportsEsports } from '@mui/icons-material';


export default function UserDetails(props) {
    const user = props.user;
    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                About {user.name}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <Work fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Career
                    </Typography>
                    <Typography variant="body2">
                        {user.job_title} at {user.company_name}
                    </Typography>
                    <Typography variant="body2">
                        Annual Income: {user.annual_income}
                    </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <School fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Education
                    </Typography>
                    <Typography variant="body2">
                        {user.education_level} from {user.college_attended}
                    </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <Language fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Background
                    </Typography>
                    <Typography variant="body2">
                        Originally from {user.nationality}
                    </Typography>
                    <Typography variant="body2">
                        Native {user.mother_tongue} speaker
                    </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <FamilyRestroom fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Family
                    </Typography>
                    <Typography variant="body2">
                        {user.family_type} family with {user.family_values} values
                    </Typography>
                    <Typography variant="body2">
                        Father: {user.fathers_occupation}, Mother: {user.mothers_occupation}
                    </Typography>
                    <Typography variant="body2">
                        {user.siblings} siblings
                    </Typography>
                </Paper>


                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <SportsEsports fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Interests
                    </Typography>
                    {/* <Typography variant="body2">
                        {user.hobbies_interests.join(", ")}
                    </Typography> */}
                </Paper>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <Restaurant fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        <SportsBar fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        <SmokingRooms fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Lifestyle
                    </Typography>
                    <Typography variant="body2">
                        {user.dietary_preference}, {user.smoking_habit}, {user.drinking_habit} drinker
                    </Typography>
                </Paper>
            </Box>
        </Paper>)
}