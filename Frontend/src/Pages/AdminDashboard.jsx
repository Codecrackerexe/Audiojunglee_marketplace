// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//     Container, Typography, Box, Paper, Grid, Tab, Tabs,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     Button, IconButton, TextField, Dialog, DialogActions,
//     DialogContent, DialogTitle, Alert
// }
//     from '@mui/material';
// import { Edit, Delete, Add } from '@mui/icons-material';

// const AdminDashboard = () => {
//     const [tabValue, setValue] = useState(0);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [dialogType, setDialogType] = useState('');
//     const [selectedItem, setSelectedItem] = useState(null);

//     const { user } = useSelector(state => state.auth);

//     //if user is admin
//     if (user?.role !== 'admin') {
//         return (
//             <Container sx={{ py: 4 }}>
//                 <Alert severity='error'>
//                     You do not have permission to access this page.
//                 </Alert>
//             </Container>
//         );
//     }

//     const handleTabChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const handleOpenDialog = (type, item = null) => {
//         setDialogType(type);
//         setSelectedItem(item);
//         setOpenDialog(true);
//     };

//     return
//     (
//         <Container sx={{ py: 4 }}>
//             <Typography variant='h4' component="h1" gutterBottom>
//                 Admin Dashboard
//             </Typography>
//             <Paper sx={{ width: '100%', mb: 4 }}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                     <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
//                         <Tab label="Users" id="admin-tab-0" />
//                         <Tab label="Products" id="admin-tab-1" />
//                         <Tab label="Categories" id="admin-tab-2" />
//                         <Tab label="Orders" id="admin-tab-3" />
//                     </Tabs>
//                 </Box>
//                 {/* Users Tab */}
//                 <TabPanel value={tabValue} index={0}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="h6">User Management</Typography>
//                         <Button
//                             variant="contained"
//                             startIcon={<Add />}
//                             onClick={() => handleOpenDialog('addUser')}
//                         >
//                             Add User
//                         </Button>
//                     </Box>

//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>ID</TableCell>
//                                     <TableCell>Username</TableCell>
//                                     <TableCell>Email</TableCell>
//                                     <TableCell>Role</TableCell>
//                                     <TableCell>Date Joined</TableCell>
//                                     <TableCell>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell>1</TableCell>
//                                     <TableCell>admin</TableCell>
//                                     <TableCell>admin@example.com</TableCell>
//                                     <TableCell>Admin</TableCell>
//                                     <TableCell>2023-01-01</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 1 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>jsmith</TableCell>
//                                     <TableCell>john.smith@somewebsite.com</TableCell>
//                                     <TableCell>Editor</TableCell>
//                                     <TableCell>2023-02-15</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 2 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>3</TableCell>
//                                     <TableCell>mjohnson</TableCell>
//                                     <TableCell>maria.johnson@mindyoumrfreak.com</TableCell>
//                                     <TableCell>User</TableCell>
//                                     <TableCell>2023-03-22</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 3 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>4</TableCell>
//                                     <TableCell>alee</TableCell>
//                                     <TableCell>alex.lee@iamsigma.com</TableCell>
//                                     <TableCell>User</TableCell>
//                                     <TableCell>2023-05-10</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 4 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>5</TableCell>
//                                     <TableCell>rwilson</TableCell>
//                                     <TableCell>rachel.wilson@dragqueen.com</TableCell>
//                                     <TableCell>Editor</TableCell>
//                                     <TableCell>2023-07-08</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editUser', { id: 5 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </TabPanel>
//                 {/* Products Tab */}
//                 <TabPanel value={tabValue} index={1}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="h6">Product Management</Typography>
//                         <Button
//                             variant="contained"
//                             startIcon={<Add />}
//                             onClick={() => handleOpenDialog('addProduct')}
//                         >
//                             Add Product
//                         </Button>
//                     </Box>

//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>ID</TableCell>
//                                     <TableCell>Title</TableCell>
//                                     <TableCell>Price</TableCell>
//                                     <TableCell>Category</TableCell>
//                                     <TableCell>Seller</TableCell>
//                                     <TableCell>Created At</TableCell>
//                                     <TableCell>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell>1</TableCell>
//                                     <TableCell>Stay With Me - Sam Rockwell</TableCell>
//                                     <TableCell>$19.99</TableCell>
//                                     <TableCell>Music</TableCell>
//                                     <TableCell>seller123</TableCell>
//                                     <TableCell>2023-01-15</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 1 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>Premium EDM Package</TableCell>
//                                     <TableCell>$49.99</TableCell>
//                                     <TableCell>Music</TableCell>
//                                     <TableCell>beatmaker42</TableCell>
//                                     <TableCell>2023-03-22</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 2 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>3</TableCell>
//                                     <TableCell>Vocal FX Plugin</TableCell>
//                                     <TableCell>$79.99</TableCell>
//                                     <TableCell>Software</TableCell>
//                                     <TableCell>audiotech</TableCell>
//                                     <TableCell>2023-04-10</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 3 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>4</TableCell>
//                                     <TableCell>Hip-Hop Beats Sample Pack</TableCell>
//                                     <TableCell>$24.99</TableCell>
//                                     <TableCell>Samples</TableCell>
//                                     <TableCell>djmixer</TableCell>
//                                     <TableCell>2023-05-18</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 4 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>5</TableCell>
//                                     <TableCell>Acoustic Guitar Loop Pack</TableCell>
//                                     <TableCell>$14.99</TableCell>
//                                     <TableCell>Samples</TableCell>
//                                     <TableCell>guitarmaster</TableCell>
//                                     <TableCell>2023-06-05</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleOpenDialog('editProduct', { id: 5 })}>
//                                             <Edit />
//                                         </IconButton>
//                                         <IconButton color="error">
//                                             <Delete />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     </TabPanel>
//                 {/* Categories Tab*/}
//                 <TabPanel value={tabValue} index={2}>
//                     <Box sx={{display:'flex', justifyContent:'space-between', mb:2}}>
//                         <
//                     </Box>
//                     </TabPanel>


//                     )
// }