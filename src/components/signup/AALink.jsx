import { useEffect, useState } from 'react'
import {
    Button,
    Box,
    Typography,
    CircularProgress

} from '@mui/material';
import api from '../../utils/auth_config';


function AALink(props) {
    const setProgress = props.setProgress;
    const [waitingForAACompletion, setWaitingForAACompletion] = useState(false);
    const POLLING_INTERVAL = 3000;
    useEffect(() => {
        let timeoutId;
        const proceedIfuserAcceptedConsent = async () => {
            try {
                const isDevelopment = import.meta.env.VITE_APP_ENV != "production";
                if (isDevelopment) {
                    setProgress(4)
                    return
                }
                const response = await api.post('/fiu/fetch-consent-status');
                console.log("API call successful, data = ", response.data);
                const consentStatus = response.data.status;

                switch (consentStatus) {
                    case 'ACTIVE':
                        setProgress(4);
                        setWaitingForAACompletion(false);
                        break;
                    case 'REJECTED':
                        setProgress(1);
                        setWaitingForAACompletion(false);
                        break;
                    case 'PENDING':
                        timeoutId = setTimeout(proceedIfuserAcceptedConsent, POLLING_INTERVAL)
                        // Keep waiting, do nothing
                        break;
                    default:
                        console.error('Unknown consent status:', consentStatus);
                        setWaitingForAACompletion(false);
                }
            } catch (error) {
                console.error('Error checking consent status:', error);
                setWaitingForAACompletion(false);
            }
        };

        if (waitingForAACompletion === true) {
            proceedIfuserAcceptedConsent()
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [waitingForAACompletion, setProgress])


    const handleAALinkClick = async () => {
        console.log("clicked on handleAALinkClick")
        try {
            const response = await api.post('/fiu/create-aa-redirect');
            window.open(response.data.redirect_url, "_blank", "noopener,noreferrer");
            setWaitingForAACompletion(true);
        } catch (error) {

            console.error('Error calling the API:', error);
        }
    };

    return <>
        <Box mb={1}>

            <Typography variant='h4'>
                Account Aggregator Signup
            </Typography>

        </Box>
        <Box mb={2}>
            <Typography>
                The account aggregator framework securely fetches your data to enhance matchmaking. We&apos;ll access your financial information and social profiles while ensuring data privacy and security.
            </Typography>
        </Box>


        <Box mb={2}>
            <Box mb={2}>
                <Typography>
                    Please read this disclaimer carefully before proceeding.
                </Typography>

            </Box>

            <Box mb={2}>
                <Typography>
                    By linking your bank account to our matchmaking platform, you consent to allowing us to access a financial summary that will help us connect you with compatible users. This information will be shared with others in a limited, summarized format, enabling users to make informed choices while respecting your privacy and security.

                </Typography>
            </Box>
            <Box mb={2}>
                <Typography variant='h6'>
                    1. Purpose of Access
                </Typography>
                <Typography>
                    Linking your bank account allows us to generate a high-level summary of your financial information. This summary may include details like your income range, spending habits, or financial stability. This data will be shared with other users to help match you with relevant individuals.
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="h6">
                    2. Data Security and Privacy
                </Typography>
                <Typography>
                    Your privacy is our top priority. All financial data shared with us will be encrypted and handled with strict confidentiality. The data displayed to other users will be in a limited, summarized form and will not include sensitive details like account numbers, transaction history, or exact balances.
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant='h6'>
                    3. Summary Only - No Sensitive Details
                </Typography>
                <Typography>

                    Only a high-level financial overview will be visible to other users. Information such as transaction details, specific account balances, and personal identifiers will remain private and secure.
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant='h6'>
                    4. Third-Party Account Aggregator
                </Typography>
                <Typography>
                    To securely link your bank account, we partner with a trusted, third-party account aggregator that complies with industry standards for security and privacy. The aggregator facilitates access but does not retain your information for any other purpose.
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant='h6'>
                    5. User Control and Responsibility
                </Typography>
                <Typography>
                    If you wish to completely remove all data associated with your profile, including financial information, you may delete your account. This action will permanently erase all your data from our platform.
                </Typography>
            </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            {!waitingForAACompletion && (
                <Typography variant="body2" mb={2} textAlign="center" fontWeight="bold">
                    After clicking the button below, a new tab will open. Once you&apos;ve accepted the consent in the new tab, please return to this page.
                </Typography>
            )}
            {waitingForAACompletion && (
                <>
                    <CircularProgress size={40} />
                    <Typography variant="body1" mt={2} mb={2}>
                        Waiting for consent approval...
                    </Typography>
                </>
            )}
            <Button
                variant='contained'
                color='primary'
                onClick={handleAALinkClick}
                fullWidth
                disabled={waitingForAACompletion}
            >
                Link Account Aggregator
            </Button>
        </Box>
    </>
}

export default AALink;
