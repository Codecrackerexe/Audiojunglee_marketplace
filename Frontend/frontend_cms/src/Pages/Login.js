import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from "../Store/Slices/authSlice";
import { Link as RouterLink} from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Link,
  Alert,
  CircularProgress,
  TextField,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password:''
    });

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.auth || {});
    const theme = useTheme();

    const handleChange = (e) => {
        if (error) dispatch(clearError());
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
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
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOpenOutlinedIcon />
                </Avatar>
                
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Welcome Back
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
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    
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
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                    
                    <Box sx={{ textAlign: 'center' }}>
                        <Link 
                            component={RouterLink} 
                            to="/register" 
                            variant="body2"
                            sx={{ 
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' } 
                            }}
                        >
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;