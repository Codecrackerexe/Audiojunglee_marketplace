import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../Store/Slices/authSlice';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        role: 'customer'
    });

    const [validationErrors, setValidationErrors] = useState({});
    
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth || {});
    const theme = useTheme();

    const handleChange = (e) => {
        if (error) dispatch(clearError());
        setFormData({...formData, [e.target.name]: e.target.value});
      
        if (validationErrors[e.target.name]) {
            setValidationErrors({
                ...validationErrors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        if (formData.password !== formData.password2) {
            errors.password2 = 'Passwords do not match';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            dispatch(register(formData));
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    mt: 8,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Create an Account
                </Typography>
                
                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ 
                            width: '100%', 
                            mb: 2,
                            borderRadius: theme.shape.borderRadius
                        }}
                    >
                        {typeof error === 'object' ? Object.values(error).flat().join(', '): error}
                    </Alert>
                )}
                
                {/* Show validation errors summary if any */}
                {Object.keys(validationErrors).length > 0 && (
                    <Alert 
                        severity="error" 
                        sx={{ 
                            width: '100%', 
                            mb: 2,
                            borderRadius: theme.shape.borderRadius
                        }}
                    >
                        Please fill in the required fields.
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!validationErrors.username}
                        helperText={validationErrors.username}
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!validationErrors.password}
                        helperText={validationErrors.password}
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!validationErrors.password2}
                        helperText={validationErrors.password2}
                    />
                    
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="content_manager">Content Manager</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 3, 
                            mb: 2,
                            py: 1.5,
                            fontWeight: 'bold',
                            borderRadius: theme.shape.borderRadius * 1.5
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Create Account"}
                    </Button>
                    
                    <Box sx={{ textAlign: 'center' }}>
                        <Link 
                            component={RouterLink} 
                            to="/login" 
                            variant="body2"
                            sx={{ 
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' } 
                            }}
                        >
                            Already have an account? Sign In
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;