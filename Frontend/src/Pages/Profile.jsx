import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../Store/Slices/authSlice';
import { fetchCategories } from '../Store/Slices/categorySlice';
import { updateUserProfile, updateUserPassword } from '../Store/Slices/authSlice';
import {
  Container, Typography, Box, Paper, Grid, TextField, Button,
  Avatar, Tab, Tabs, List, ListItem, ListItemText, Chip,
  CircularProgress, Alert, MenuItem,
} from '@mui/material';
import { uploadAudioFile, createProduct } from '../Store/Slices/productSlice';

const PREDEFINED_CATEGORIES = [
  { id: "Ambient", name: "Ambient" },
  { id: "Electronic", name: "Electronic" },
  { id: "Hip Hop", name: "Hip Hop" },
  { id: "Jazz", name: "Jazz" },
  { id: "Rock metal", name: "Rock Metal" },
  { id: "Classical", name: "Classical" },
  { id: "Lo-Fi", name: "Lo-Fi" },
  { id: "Cinematic", name: "Cinematic" },
  { id: "Bollywood", name: "Bollywood" }
];

// TabPanel component for the tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      aria-controls={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

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
    category: [] // Changed from string to array
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAudioUploadSuccess, setShowAudioUploadSuccess] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { categories = [] } = useSelector(state => state.categories);
  const {
    audioFile,
    uploadLoading,
    uploadError,
    loading: productLoading,
    error: productError
  } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCategories());
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

  // Audio file upload success message timeout
  useEffect(() => {
    if (audioFile && !uploadLoading) {
      setShowAudioUploadSuccess(true);

      // Set a timeout to hide the alert after 3 seconds
      const timer = setTimeout(() => {
        setShowAudioUploadSuccess(false);
      }, 3000);

      // Clean up the timer on component unmount or when audioFile changes
      return () => clearTimeout(timer);
    }
  }, [audioFile, uploadLoading]);

  // Show product errors in the update error state
  useEffect(() => {
    if (productError) {
      setUpdateError(productError);
    }
  }, [productError]);

  // Clear error when changing tabs
  useEffect(() => {
    setUpdateError(null);
  }, [value]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setUpdateError(null);
  };

  const handleFormChange = (e, formSetter, formData) => {
    formSetter({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (e) => {
    const {
      target: { value },
    } = e;

    const categoryValues = typeof value === 'string' ? value.split(',') : value;
    setProductForm({
      ...productForm,
      category: categoryValues
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('audio/')) {
        setUpdateError('Please select an audio file');
        return;
      }
      // Check file size (e.g., 10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUpdateError('File size exceeds 10MB limit');
        return;
      }
      setSelectedFile(file);
      setUpdateError(null);
    }
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      setUpdateError(null);
      dispatch(uploadAudioFile(selectedFile));
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setProfileUpdateLoading(true);
    setUpdateError(null);

    dispatch(updateUserProfile(profileData))
      .unwrap()
      .then(() => {
        showSuccessMessage('Profile updated successfully!');
      })
      .catch((error) => {
        setUpdateError(error);
      })
      .finally(() => {
        setProfileUpdateLoading(false);
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword.new !== newPassword.confirm) {
      setUpdateError("New passwords don't match");
      return;
    }

    // Validate password strength
    if (newPassword.new.length < 8) {
      setUpdateError("Password must be at least 8 characters long");
      return;
    }

    setPasswordUpdateLoading(true);
    setUpdateError(null);

    dispatch(updateUserPassword({
      current_password: newPassword.current,
      new_password: newPassword.new
    }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Password updated successfully!');
        setNewPassword({ current: '', new: '', confirm: '' });
      })
      .catch((error) => {
        setUpdateError(error);
      })
      .finally(() => {
        setPasswordUpdateLoading(false);
      });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (!audioFile) {
      setUpdateError('Please upload an audio file first');
      return;
    }

    const productData = {
      title: productForm.title,
      description: productForm.description,
      price: parseFloat(productForm.price),
      categories: productForm.category,
      audio_file: audioFile.id
    };

    dispatch(createProduct(productData))
      .unwrap()
      .then(() => {
        showSuccessMessage('Product created successfully!');
        // Reset form after submission
        setProductForm({
          title: '',
          description: '',
          price: '',
          category: []
        });
        setSelectedFile(null);
      })
      .catch((error) => {
        setUpdateError(error);
      });
  };

  const formatError = (error) => {
    if (!error) return '';

    if (typeof error === 'object') {
      return Object.values(error).flat().join(', ');
    }
    return error;
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
                <Tab label="Profile" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
                <Tab label="Password" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
                <Tab label="My Orders" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
                {(user?.role === 'admin' || user?.role === 'content_manager') && (
                  <Tab label="Upload Audio" id="profile-tab-3" aria-controls="profile-tabpanel-3" />
                )}
              </Tabs>
            </Box>

            {updateSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {successMessage || 'Updated successfully!'}
              </Alert>
            )}

            {updateError && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {formatError(updateError)}
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
                      onChange={(e) => handleFormChange(e, setProfileData, profileData)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleFormChange(e, setProfileData, profileData)}
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
                      onChange={(e) => handleFormChange(e, setProfileData, profileData)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={profileUpdateLoading}
                  sx={{ mt: 3 }}
                >
                  {profileUpdateLoading ? <CircularProgress size={24} /> : 'Update Profile'}
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
                      required
                      label="Current Password"
                      name="current"
                      type="password"
                      value={newPassword.current}
                      onChange={(e) => handleFormChange(e, setNewPassword, newPassword)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="New Password"
                      name="new"
                      type="password"
                      value={newPassword.new}
                      onChange={(e) => handleFormChange(e, setNewPassword, newPassword)}
                      helperText="Password must be at least 8 characters long"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Confirm New Password"
                      name="confirm"
                      type="password"
                      value={newPassword.confirm}
                      onChange={(e) => handleFormChange(e, setNewPassword, newPassword)}
                      error={newPassword.new !== newPassword.confirm && newPassword.confirm !== ''}
                      helperText={
                        newPassword.new !== newPassword.confirm && newPassword.confirm !== ''
                          ? "Passwords don't match"
                          : ""
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={passwordUpdateLoading}
                  sx={{ mt: 3 }}
                >
                  {passwordUpdateLoading ? <CircularProgress size={24} /> : 'Update Password'}
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
                          style={{ display: 'none' }}
                          id="audio-file-upload"
                          type="file"
                          onChange={handleFileChange}
                          accept="audio/*"
                        />
                        <label htmlFor="audio-file-upload">
                          <Button variant="outlined" component="span" fullWidth>
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
                        fullWidth
                      >
                        {uploadLoading ? <CircularProgress size={24} /> : 'Upload Audio'}
                      </Button>

                      {uploadError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {formatError(uploadError)}
                        </Alert>
                      )}

                      {audioFile && showAudioUploadSuccess && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                          File uploaded successfully! ID: {audioFile.id}
                        </Alert>
                      )}
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        2. Product Details
                      </Typography>

                      <Box component="form" onSubmit={handleCreateProduct}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              required
                              label="Product Title"
                              name="title"
                              value={productForm.title}
                              onChange={(e) => handleFormChange(e, setProductForm, productForm)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              required
                              label="Description"
                              name="description"
                              multiline
                              rows={3}
                              value={productForm.description}
                              onChange={(e) => handleFormChange(e, setProductForm, productForm)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              required
                              label="Price"
                              name="price"
                              type="number"
                              value={productForm.price}
                              onChange={(e) => handleFormChange(e, setProductForm, productForm)}
                              InputProps={{ startAdornment: '$' }}
                              inputProps={{ min: 0, step: 0.01 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Categories"
                              name="category"
                              value={productForm.category}
                              onChange={handleCategoryChange}
                              SelectProps={{
                                multiple: true,
                                renderValue: (selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                ),
                              }}
                            >
                              {PREDEFINED_CATEGORIES.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                  {category.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        </Grid>

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={!audioFile || productLoading || !productForm.title || !productForm.price}
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

export default Profile;