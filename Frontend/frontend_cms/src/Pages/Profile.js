import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../Store/Slices/authSlice';
import {
  Container, Typography, Box, Paper, Grid, TextField, Button,
  Avatar, Tab, Tabs, List, ListItem, ListItemText, Chip,
  CircularProgress, Alert
} from '@mui/material';
import { uploadAudioFile, createProduct } from '../Store/Slices/productSlice';

const Profile = () => {
  const [value, setValue] = useState(0);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const dispatch = useDispatch();
  
  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { categories } = useSelector(state => state.categories);
  const { 
    audioFile, 
    uploadLoading, 
    uploadError, 
    loading: productLoading 
  } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
      });
    }
  }, [user]);
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePasswordChange = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value
    });
  };
  
  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUploadFile = () => {
    if (selectedFile) {
      dispatch(uploadAudioFile(selectedFile));
    }
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 1000);
  };
  
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setUpdateSuccess(true);
      setNewPassword({ current: '', new: '', confirm: '' });
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 1000);
  };
  
  const handleCreateProduct = (e) => {
    e.preventDefault();
    
    if (!audioFile) {
      return;
    }
    
    const productData = {
      title: productForm.title,
      description: productForm.description,
      price: parseFloat(productForm.price),
      category: productForm.category ? parseInt(productForm.category) : null,
      audio_file: audioFile.id
    };
    
    dispatch(createProduct(productData));
    
    // Reset form after submission
    setProductForm({
      title: '',
      description: '',
      price: '',
      category: ''
    });
    setSelectedFile(null);
  };
  
  if (userLoading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              src={user?.profile_picture}
              alt={user?.username}
            />
            <Typography variant="h5" gutterBottom>
              {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            <Chip 
              label={user?.role === 'admin' ? 'Admin' : user?.role === 'content_manager' ? 'Content Manager' : 'Customer'} 
              color="primary" 
              size="small" 
              sx={{ mt: 1 }} 
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Profile" id="profile-tab-0" />
                <Tab label="Password" id="profile-tab-1" />
                <Tab label="My Orders" id="profile-tab-2" />
                {(user?.role === 'admin' || user?.role === 'content_manager') && (
                  <Tab label="Upload Audio" id="profile-tab-3" />
                )}
              </Tabs>
            </Box>
            
            {updateSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Updated successfully!
              </Alert>
            )}
            
            {/* Profile Tab */}
            <TabPanel value={value} index={0}>
              <Box component="form" onSubmit={handleUpdateProfile} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      multiline
                      rows={4}
                      value={profileData.bio}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Update Profile
                </Button>
              </Box>
            </TabPanel>
            
            {/* Password Tab */}
            <TabPanel value={value} index={1}>
              <Box component="form" onSubmit={handleUpdatePassword} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="current"
                      type="password"
                      value={newPassword.current}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="new"
                      type="password"
                      value={newPassword.new}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirm"
                      type="password"
                      value={newPassword.confirm}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Update Password
                </Button>
              </Box>
            </TabPanel>
            
            {/* Orders Tab */}
            <TabPanel value={value} index={2}>
              <Typography variant="h6" gutterBottom>
                Your Orders
              </Typography>
              
              <List>
                <ListItem sx={{ bgcolor: 'background.default', mb: 2 }}>
                  <ListItemText
                    primary="No orders found"
                    secondary="You haven't placed any orders yet."
                  />
                </ListItem>
              </List>
            </TabPanel>
            
            {/* Upload Audio Tab (for content creators and admins) */}
            {(user?.role === 'admin' || user?.role === 'content_manager') && (
              <TabPanel value={value} index={3}>
                <Typography variant="h6" gutterBottom>
                  Upload New Audio Product
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        1. Upload Audio File
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <input
                          accept="audio/*"
                          style={{ display: 'none' }}
                          id="audio-file-upload"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="audio-file-upload">
                          <Button
                            variant="outlined"
                            component="span"
                            fullWidth
                          >
                            Select Audio File
                          </Button>
                        </label>
                      </Box>
                      
                      {selectedFile && (
                        <Typography variant="body2" gutterBottom>
                          Selected: {selectedFile.name}
                        </Typography>
                      )}
                      
                      <Button
                        variant="contained"
                        onClick={handleUploadFile}
                        disabled={!selectedFile || uploadLoading}
                        sx={{ mt: 1 }}
                      >
                        {uploadLoading ? <CircularProgress size={24} /> : 'Upload'}
                      </Button>
                      
                      {uploadError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {typeof uploadError === 'object' 
                            ? Object.values(uploadError).flat().join(', ') 
                            : uploadError}
                        </Alert>
                      )}
                      
                      {audioFile && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                          File uploaded successfully! You can now create the product.
                        </Alert>
                      )}
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        2. Create Product
                      </Typography>
                      
                      <Box component="form" onSubmit={handleCreateProduct}>
                        <TextField
                          fullWidth
                          required
                          label="Title"
                          name="title"
                          value={productForm.title}
                          onChange={handleProductChange}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          required
                          label="Description"
                          name="description"
                          multiline
                          rows={4}
                          value={productForm.description}
                          onChange={handleProductChange}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          required
                          label="Price ($)"
                          name="price"
                          type="number"
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          value={productForm.price}
                          onChange={handleProductChange}
                          margin="normal"
                        />
                        <TextField
                          select
                          fullWidth
                          label="Category"
                          name="category"
                          value={productForm.category}
                          onChange={handleProductChange}
                          margin="normal"
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </TextField>
                        
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={!audioFile || productLoading}
                          sx={{ mt: 3 }}
                        >
                          {productLoading ? <CircularProgress size={24} /> : 'Create Product'}
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Profile;
