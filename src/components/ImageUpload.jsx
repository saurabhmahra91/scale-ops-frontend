import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

function ImageUpload({ setProgress }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Here you would typically send the file to your backend API
            // For now, we'll just log it and move to the next step
            console.log('File selected:', selectedFile);
            setProgress(prevProgress => prevProgress + 1);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Upload Profile Picture</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Choose File
                </Button>
            </label>
            {selectedFile && (
                <Typography variant="body2" style={{ marginTop: 10 }}>
                    Selected file: {selectedFile.name}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                style={{ marginTop: 20 }}
                disabled={!selectedFile}
            >
                Upload and Continue
            </Button>
        </Box>
    );
}

export default ImageUpload;