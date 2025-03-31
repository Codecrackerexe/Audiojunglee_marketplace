import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword as resetPasswordAction, clearError } from '../Store/Slices/authSlice';
import {
    Container,
    Box,
    Typography,
    Button,
    Alert,
    CircularProgress,
    TextField,
    Paper,
    Avatar,
    useTheme,
    stepContentClasses
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { clearReviews } from '../Store/Slices/reviewsSlice';

const resetPassword = () => {
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState('');
    const [resetComplete, setResetComplete] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { loading, error } = useSelector(state => state.auth || {});
    const theme = useTheme();

    useEffect(() => {
        dispatch(clearError()); //removing any prior errors
    }, [dispatch]);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setValidationError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //validation
        if (passwords.newPassword.length < 8) {
            setValidationError('Password must be at least 8 characters long');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        //dispatch reset action
        dispatch(resetPasswordAction({
            token,
            newPassword: passwords.newPassword
        }))
            .unwrap()
            .then(() => {
                setResetComplete(true);
                dispatch(clearReviews());
                //redirect to login
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            })
            .catch((err) => {
                console.error('Password reset failed', err);
            });
    };

    //show success msg if reset
    if (resetComplete) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Alert severity='success'>
                        Password reset successful! You will be redirected to the login page.
                    </Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>

                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant='h5' sx={{ mb: 3 }}>
                        Reset Password
                    </Typography>
                    {error && (
                        <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {validationError && (
                        <Alert severity='warning' sx={{ width: '100%', mb: 2 }}>
                            {validationError}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id='newPassword'
                            autoComplete='new-password'
                            value={passwords.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default resetPassword;
