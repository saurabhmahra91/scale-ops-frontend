import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';


export default function FinancialInfo(props) {
    const financialInfo = props.financialInfo;
    console.log(financialInfo, "financialInfo")
    if (!financialInfo || financialInfo.length === 0 ) {
        return <Typography>No financial information available.</Typography>;
    }

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Financial Information
            </Typography>
            {financialInfo.map((category, index) => (
                <Paper key={index} elevation={1} sx={{ p: 2, mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {category.category}
                    </Typography>
                    <List dense>
                        {category.parameters.map((param, paramIndex) => (
                            <ListItem key={paramIndex}>
                                <ListItemText
                                    primary={param.representative_text}
                                    secondary={param.additional_text}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ))}
        </Box>
    )
}