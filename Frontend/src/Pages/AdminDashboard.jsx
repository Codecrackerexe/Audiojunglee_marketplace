import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    Alert,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Chip,
    Divider,
    Avatar,
    CircularProgress,
    Tooltip,
    Snackbar,
    useTheme,
    alpha
} from '@mui/material';
import {
    Edit,
    Delete,
    Add,
    Person,
    ShoppingCart,
    Category,
    Inventory,
    Search,
    FilterList,
    Refresh,
    MoreVert
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Mock data fetching functions (replace with actual API calls)
const fetchUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', dateJoined: '2023-01-01', status: 'active' },
                { id: 2, username: 'seller1', email: 'seller1@example.com', role: 'seller', dateJoined: '2023-01-15', status: 'active' },
                { id: 3, username: 'user123', email: 'user123@example.com', role: 'user', dateJoined: '2023-02-05', status: 'inactive' },
                { id: 4, username: 'producer42', email: 'producer@example.com', role: 'seller', dateJoined: '2023-03-10', status: 'active' }
            ]);
        }, 500);
    });
};

const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Ambient Piano Loop', price: 19.99, category: 'Music', seller: 'seller1', createdAt: '2023-01-15', sales: 28 },
                { id: 2, title: 'Epic Drum Kit', price: 34.99, category: 'Music', seller: 'producer42', createdAt: '2023-02-20', sales: 45 },
                { id: 3, title: 'Nature Sounds Pack', price: 12.99, category: 'SFX', seller: 'seller1', createdAt: '2023-03-05', sales: 17 },
                { id: 4, title: 'Vocal Samples Vol. 1', price: 24.99, category: 'Vocals', seller: 'producer42', createdAt: '2023-04-10', sales: 32 }
            ]);
        }, 500);
    });
};

const fetchCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Music', description: 'All music tracks', parentCategory: 'None', productCount: 56 },
                { id: 2, name: 'SFX', description: 'Sound effects library', parentCategory: 'None', productCount: 38 },
                { id: 3, name: 'Vocals', description: 'Vocal samples and acapellas', parentCategory: 'None', productCount: 24 },
                { id: 4, name: 'Lo-Fi', description: 'Lo-fi beats and samples', parentCategory: 'Music', productCount: 18 }
            ]);
        }, 500);
    });
};

const fetchOrders = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, customer: 'user123', totalAmount: 39.98, status: 'completed', date: '2023-01-20', items: 2 },
                { id: 2, customer: 'musicfan99', totalAmount: 24.99, status: 'processing', date: '2023-02-15', items: 1 },
                { id: 3, customer: 'beatmaker', totalAmount: 47.98, status: 'completed', date: '2023-03-05', items: 3 },
                { id: 4, customer: 'dj_master', totalAmount: 34.99, status: 'cancelled', date: '2023-03-10', items: 1 }
            ]);
        }, 500);
    });
};

// TabPanel component
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin - tabpanel - ${index} `}
            aria-labelledby={`admin - tab - ${index} `}
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

// Dashboard summary cards
const SummaryCard = ({ title, value, icon, color }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            height: '100%',
            boxShadow: theme.shadows[2],
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[6],
            }
        }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(color, 0.2), color: color, width: 56, height: 56 }}>
                    {icon}
                </Avatar>
            </CardContent>
        </Card>
    );
};

const AdminDashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Data states
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);

    const { user } = useSelector(state => state.auth);

    // Form state for the dialogs
    const [formData, setFormData] = useState({});

    // Load data on component mount and tab change
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                switch (tabValue) {
                    case 0:
                        if (users.length === 0) {
                            const userData = await fetchUsers();
                            setUsers(userData);
                        }
                        break;
                    case 1:
                        if (products.length === 0) {
                            const productData = await fetchProducts();
                            setProducts(productData);
                        }
                        break;
                    case 2:
                        if (categories.length === 0) {
                            const categoryData = await fetchCategories();
                            setCategories(categoryData);
                        }
                        break;
                    case 3:
                        if (orders.length === 0) {
                            const orderData = await fetchOrders();
                            setOrders(orderData);
                        }
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error("Error loading data:", error);
                setSnackbar({
                    open: true,
                    message: "Error loading data. Please try again.",
                    severity: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [tabValue]);

    // Check if user is admin
    if (user?.role !== 'admin') {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error" sx={{ p: 2, borderRadius: 1 }}>
                    You do not have permission to access this page.
                </Alert>
            </Container>
        );
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type, item = null) => {
        setDialogType(type);
        setSelectedItem(item);
        setFormData(item || {});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedItem(null);
        setFormData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Simulate API call to save data
        const isEdit = dialogType.startsWith('edit');
        const entityType = dialogType.replace(isEdit ? 'edit' : 'add', '').toLowerCase();

        // Create a new object with the form data
        const newItem = { ...formData };

        if (!isEdit) {
            // For new items, generate an ID
            newItem.id = Math.floor(Math.random() * 10000);

            // Add additional properties based on entity type
            if (entityType === 'user') {
                newItem.dateJoined = new Date().toISOString().split('T')[0];
                newItem.status = 'active';
            } else if (entityType === 'product') {
                newItem.createdAt = new Date().toISOString().split('T')[0];
                newItem.sales = 0;
            }
        }

        // Update the corresponding state
        if (entityType === 'user') {
            setUsers(prev => isEdit
                ? prev.map(item => item.id === newItem.id ? newItem : item)
                : [...prev, newItem]
            );
        } else if (entityType === 'product') {
            setProducts(prev => isEdit
                ? prev.map(item => item.id === newItem.id ? newItem : item)
                : [...prev, newItem]
            );
        } else if (entityType === 'category') {
            setCategories(prev => isEdit
                ? prev.map(item => item.id === newItem.id ? newItem : item)
                : [...prev, newItem]
            );
        }

        // Show success message
        setSnackbar({
            open: true,
            message: `${isEdit ? 'Updated' : 'Added'} ${entityType} successfully`,
            severity: "success"
        });

        handleCloseDialog();
    };

    const handleDelete = (entityType, id) => {
        // Simulate API call to delete data
        if (entityType === 'user') {
            setUsers(prev => prev.filter(item => item.id !== id));
        } else if (entityType === 'product') {
            setProducts(prev => prev.filter(item => item.id !== id));
        } else if (entityType === 'category') {
            setCategories(prev => prev.filter(item => item.id !== id));
        }

        setSnackbar({
            open: true,
            message: `Deleted ${entityType} successfully`,
            severity: "success"
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                Admin Dashboard
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Users"
                        value={users.length}
                        icon={<Person fontSize="large" />}
                        color={theme.palette.primary.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Products"
                        value={products.length}
                        icon={<Inventory fontSize="large" />}
                        color={theme.palette.secondary.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Categories"
                        value={categories.length}
                        icon={<Category fontSize="large" />}
                        color={theme.palette.success.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Orders"
                        value={orders.length}
                        icon={<ShoppingCart fontSize="large" />}
                        color={theme.palette.warning.main}
                    />
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    mb: 4,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider} `,
                    borderRadius: 2,
                    boxShadow: theme.shadows[2]
                }}
            >
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="admin tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 'medium',
                                py: 2
                            }
                        }}
                    >
                        <Tab
                            label="Users"
                            id="admin-tab-0"
                            icon={<Person />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Products"
                            id="admin-tab-1"
                            icon={<Inventory />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Categories"
                            id="admin-tab-2"
                            icon={<Category />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Orders"
                            id="admin-tab-3"
                            icon={<ShoppingCart />}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* Users Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>User Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addUser')}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 2
                            }}
                        >
                            Add User
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={users}
                                columns={[
                                    { field: 'id', headerName: 'ID', width: 70 },
                                    { field: 'username', headerName: 'Username', width: 150 },
                                    { field: 'email', headerName: 'Email', width: 200 },
                                    {
                                        field: 'role',
                                        headerName: 'Role',
                                        width: 120,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                color={
                                                    params.value === 'admin' ? 'error' :
                                                        params.value === 'seller' ? 'primary' : 'default'
                                                }
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    },
                                    { field: 'dateJoined', headerName: 'Date Joined', width: 150 },
                                    {
                                        field: 'status',
                                        headerName: 'Status',
                                        width: 120,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                color={params.value === 'active' ? 'success' : 'default'}
                                                size="small"
                                            />
                                        )
                                    },
                                    {
                                        field: 'actions',
                                        headerName: 'Actions',
                                        width: 150,
                                        renderCell: (params) => (
                                            <Box>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpenDialog('editUser', params.row)}
                                                        size="small"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete('user', params.row.id)}
                                                        size="small"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        )
                                    }
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Toolbar: GridToolbar
                                }}
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        borderRadius: 0
                                    }
                                }}
                            />
                        </Box>
                    )}
                </TabPanel>

                {/* Products Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Product Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addProduct')}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 2
                            }}
                        >
                            Add Product
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={products}
                                columns={[
                                    { field: 'id', headerName: 'ID', width: 70 },
                                    { field: 'title', headerName: 'Title', width: 200 },
                                    {
                                        field: 'price',
                                        headerName: 'Price',
                                        width: 120,
                                        renderCell: (params) => `$${params.value.toFixed(2)} `
                                    },
                                    {
                                        field: 'category',
                                        headerName: 'Category',
                                        width: 130,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    },
                                    { field: 'seller', headerName: 'Seller', width: 120 },
                                    { field: 'createdAt', headerName: 'Created At', width: 150 },
                                    {
                                        field: 'sales',
                                        headerName: 'Sales',
                                        width: 100,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                color={
                                                    params.value > 30 ? 'success' :
                                                        params.value > 15 ? 'primary' : 'default'
                                                }
                                                size="small"
                                            />
                                        )
                                    },
                                    {
                                        field: 'actions',
                                        headerName: 'Actions',
                                        width: 150,
                                        renderCell: (params) => (
                                            <Box>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpenDialog('editProduct', params.row)}
                                                        size="small"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete('product', params.row.id)}
                                                        size="small"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        )
                                    }
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Toolbar: GridToolbar
                                }}
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        borderRadius: 0
                                    }
                                }}
                            />
                        </Box>
                    )}
                </TabPanel>

                {/* Categories Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Category Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpenDialog('addCategory')}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 2
                            }}
                        >
                            Add Category
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={categories}
                                columns={[
                                    { field: 'id', headerName: 'ID', width: 70 },
                                    { field: 'name', headerName: 'Name', width: 150 },
                                    { field: 'description', headerName: 'Description', width: 250 },
                                    { field: 'parentCategory', headerName: 'Parent Category', width: 150 },
                                    {
                                        field: 'productCount',
                                        headerName: 'Products',
                                        width: 120,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                color={
                                                    params.value > 40 ? 'success' :
                                                        params.value > 20 ? 'primary' : 'default'
                                                }
                                                size="small"
                                            />
                                        )
                                    },
                                    {
                                        field: 'actions',
                                        headerName: 'Actions',
                                        width: 150,
                                        renderCell: (params) => (
                                            <Box>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpenDialog('editCategory', params.row)}
                                                        size="small"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete('category', params.row.id)}
                                                        size="small"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        )
                                    }
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Toolbar: GridToolbar
                                }}
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        borderRadius: 0
                                    }
                                }}
                            />
                        </Box>
                    )}
                </TabPanel>

                {/* Orders Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Order Management</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Refresh />}
                            onClick={() => {
                                setLoading(true);
                                fetchOrders().then(data => {
                                    setOrders(data);
                                    setLoading(false);
                                });
                            }}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 2
                            }}
                        >
                            Refresh
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={orders}
                                columns={[
                                    { field: 'id', headerName: 'ID', width: 70 },
                                    { field: 'customer', headerName: 'Customer', width: 150 },
                                    {
                                        field: 'totalAmount',
                                        headerName: 'Total Amount',
                                        width: 150,
                                        renderCell: (params) => `$${params.value.toFixed(2)} `
                                    },
                                    {
                                        field: 'status',
                                        headerName: 'Status',
                                        width: 140,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                color={
                                                    params.value === 'completed' ? 'success' :
                                                        params.value === 'processing' ? 'primary' :
                                                            params.value === 'cancelled' ? 'error' : 'default'
                                                }
                                                size="small"
                                            />
                                        )
                                    },
                                    { field: 'date', headerName: 'Date', width: 150 },
                                    {
                                        field: 'items',
                                        headerName: 'Items',
                                        width: 100,
                                        renderCell: (params) => (
                                            <Chip
                                                label={params.value}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    },
                                    {
                                        field: 'actions',
                                        headerName: 'Actions',
                                        width: 150,
                                        renderCell: (params) => (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{ borderRadius: 2, textTransform: 'none' }}
                                            >
                                                View Details
                                            </Button>
                                        )
                                    }
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Toolbar: GridToolbar
                                }}
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        borderRadius: 0
                                    }
                                }}
                            />
                        </Box>
                    )}
                </TabPanel>
            </Paper>

            {/* Dialogs for adding/editing items */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: theme.shadows[10]
                    }
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: `1px solid ${theme.palette.divider} `,
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                }}>
                    {dialogType === 'addUser' && 'Add New User'}
                    {dialogType === 'editUser' && 'Edit User'}
                    {dialogType === 'addProduct' && 'Add New Product'}
                    {dialogType === 'editProduct' && 'Edit Product'}
                    {dialogType === 'addCategory' && 'Add New Category'}
                    {dialogType === 'editCategory' && 'Edit Category'}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    {/* User Form */}
                    {(dialogType === 'addUser' || dialogType === 'editUser') && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    variant="outlined"
                                    value={formData.username || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="user-role-label">Role</InputLabel>
                                    <Select
                                        labelId="user-role-label"
                                        name="role"
                                        label="Role"
                                        value={formData.role || 'user'}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="seller">Seller</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {dialogType === 'addUser' && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        value={formData.password || ''}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            )}
                            {dialogType === 'editUser' && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="user-status-label">Status</InputLabel>
                                        <Select
                                            labelId="user-status-label"
                                            name="status"
                                            label="Status"
                                            value={formData.status || 'active'}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                            <MenuItem value="suspended">Suspended</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                    )}

                    {/* Product Form */}
                    {(dialogType === 'addProduct' || dialogType === 'editProduct') && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Product Title"
                                    name="title"
                                    variant="outlined"
                                    value={formData.title || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    variant="outlined"
                                    value={formData.price || ''}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: <span>$</span>,
                                    }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="product-category-label">Category</InputLabel>
                                    <Select
                                        labelId="product-category-label"
                                        name="category"
                                        label="Category"
                                        value={formData.category || ''}
                                        onChange={handleInputChange}
                                    >
                                        {categories.map(cat => (
                                            <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            {dialogType === 'addProduct' && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="product-seller-label">Seller</InputLabel>
                                        <Select
                                            labelId="product-seller-label"
                                            name="seller"
                                            label="Seller"
                                            value={formData.seller || ''}
                                            onChange={handleInputChange}
                                        >
                                            {users.filter(u => u.role === 'seller').map(seller => (
                                                <MenuItem key={seller.id} value={seller.username}>{seller.username}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                    )}

                    {/* Category Form */}
                    {(dialogType === 'addCategory' || dialogType === 'editCategory') && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Category Name"
                                    name="name"
                                    variant="outlined"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="parent-category-label">Parent Category</InputLabel>
                                    <Select
                                        labelId="parent-category-label"
                                        name="parentCategory"
                                        label="Parent Category"
                                        value={formData.parentCategory || 'None'}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        {categories.map(cat => (
                                            cat.parentCategory === 'None' && cat.name !== formData.name && (
                                                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                                            )
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider} ` }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                        {dialogType.startsWith('add') ? 'Add' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminDashboard;