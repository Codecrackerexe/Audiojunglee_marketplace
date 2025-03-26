import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const AdminDashboard = () => {
    const [tabValue, setValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const { user } = useSelector(state => state.auth);

    //checking if user is admin
    if (user?.role !== 'admin') {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    You do not have permission to access this page.
                </Alert>
            </Container>
        );
    }
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenDialog = (type, item = null) => {
        setDialogType(type);
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedItem(null);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>

            <Paper sx={{ width: '100%', mb: 4 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
                        <Tab label="Users" id="admin-tab-0" />
                        <Tab label="Products" id="admin-tab-1" />
                        <Tab label="Categories" id="admin-tab-2" />
                        <Tab label="Orders" id="admin-tab-3" />
                    </Tabs>
                </Box>

                {/* Users Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">User Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addUser')}
                        >
                            Add User
                        </Button>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Date Joined</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>admin</TableCell>
                                    <TableCell>admin@example.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>2023-01-01</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 1 })}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Products Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Product Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addProduct')}
                        >
                            Add Product
                        </Button>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Seller</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Sample Audio Track</TableCell>
                                    <TableCell>$19.99</TableCell>
                                    <TableCell>Music</TableCell>
                                    <TableCell>seller123</TableCell>
                                    <TableCell>2023-01-15</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 1 })}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                {/* Add more dummy rows as needed */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Categories Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Category Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addCategory')}
                        >
                            Add Category
                        </Button>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Parent Category</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Music</TableCell>
                                    <TableCell>All music tracks</TableCell>
                                    <TableCell>None</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleOpenDialog('editCategory', { id: 1 })}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Orders Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                        Order Management
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>customer123</TableCell>
                                    <TableCell>$39.98</TableCell>
                                    <TableCell>Completed</TableCell>
                                    <TableCell>2023-01-20</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" size="small">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Paper>

            {/* Dialogs for adding/editing items */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === 'addUser' && 'Add New User'}
                    {dialogType === 'addUser' && 'Add New User'}
                    {dialogType === 'editUser' && 'Edit User'}
                    {dialogType === 'addProduct' && 'Add New Product'}
                    {dialogType === 'editProduct' && 'Edit Product'}
                    {dialogType === 'addCategory' && 'Add New Category'}
                    {dialogType === 'editCategory' && 'Edit Category'}
                </DialogTitle>
                <DialogContent>
                    {/* User Form */}
                    {(dialogType === 'addUser' || dialogType === 'editUser') && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    defaultValue={selectedItem?.username || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    defaultValue={selectedItem?.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Role"
                                    defaultValue={selectedItem?.role || 'customer'}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="content_manager">Content Manager</option>
                                    <option value="customer">Customer</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    )}

                    {/* Product Form */}
                    {(dialogType === 'addProduct' || dialogType === 'editProduct') && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    defaultValue={selectedItem?.title || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    defaultValue={selectedItem?.description || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                                    defaultValue={selectedItem?.price || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Category"
                                    defaultValue={selectedItem?.category || ''}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select a category</option>
                                    <option value="1">Music</option>
                                    <option value="2">Sound Effects</option>
                                    <option value="3">Podcasts</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    )}

                    {/* Category Form */}
                    {(dialogType === 'addCategory' || dialogType === 'editCategory') && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    defaultValue={selectedItem?.name || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    defaultValue={selectedItem?.description || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Parent Category"
                                    defaultValue={selectedItem?.parent || ''}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">None (Root Category)</option>
                                    <option value="1">Music</option>
                                    <option value="2">Sound Effects</option>
                                    <option value="3">Podcasts</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseDialog}>
                        {dialogType.startsWith('add') ? 'Add' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
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
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
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

export default AdminDashboard;
