import { useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,  
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

function ProfileDetails(props) {

    const formDataStep2 = props.formDataStep2;
    const handleEdit = props.handleEdit;
    const handleSubmit = props.handleSubmit;


    return (
        <form>
            <TextField
                fullWidth
                label="Next Name"
                a="a"
                value={formDataStep2.a}
                onChange={handleEdit}
                margin="normal"
            />

<FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    name="marital status"
                    value={formDataStep2.c}
                    onChange={handleEdit}
                    label="Marital Status"
                >
                    <MenuItem value="yes">Yess</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Wow Name"
                b="b"
                value={formDataStep2.b}
                onChange={handleEdit}
                margin="normal"
            />
             <TextField
                fullWidth
                label="Super Name"
                d="d"
                value={formDataStep2.d}
                onChange={handleEdit}
                margin="normal"
            />
            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Next/Submit
            </Button>
        </form>
            
    );
}

export default ProfileDetails;
