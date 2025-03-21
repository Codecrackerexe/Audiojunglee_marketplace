import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Divider,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText
} from '@mui/material';
import { Delete, ShoppingCart, MusicNote } from '@mui/icons-material';

// Constants
const PLATFORM_FEE_RATE = 0.05;
const MINIMUM_PLATFORM_FEE = 1.99;
const MAX_QUANTITY = 50;
const MIN_QUANTITY = 1;

const Cart = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated) || false;

  const Tracks = [
    {
      id: 1,
      name: "Midnight Dreams",
      category: "Ambient",
      price: 9.99,
      duration: "3:45",
      imageUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Urban Beats",
      category: "Hip Hop",
      price: 12.99,
      duration: "4:20",
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Classical Symphony No. 5",
      category: "Classical",
      price: 14.99,
      duration: "8:15",
      imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Electric Waves",
      category: "Electronic",
      price: 11.99,
      duration: "5:30",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      name: "Smooth Jazz Evening",
      category: "Jazz",
      price: 8.99,
      duration: "6:10",
      imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const cartItems = Tracks.map(track => ({
    product: track,
    quantity: Math.floor(Math.random() * 3) + 1
  }));

  const [items, setItems] = useState(cartItems);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState({});

  // cart total
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [items]);

  const platformFee = useMemo(() => {
    const calculatedFee = subtotal * PLATFORM_FEE_RATE;
    return Math.max(calculatedFee, MINIMUM_PLATFORM_FEE);
  }, [subtotal]);

  const cartTotal = useMemo(() => {
    return subtotal + platformFee;
  }, [subtotal, platformFee]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const handleRemoveItem = useCallback((productId) => {
    try {
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (err) {
      setError("Failed to remove item. Please try again.");
    }
  }, []);

  const handleQuantityChange = useCallback((productId, newValue) => {
    const newQuantity = parseInt(newValue, 10);

    if (isNaN(newQuantity)) {
      setQuantityErrors(prev => ({
        ...prev,
        [productId]: "Please enter a valid number"
      }));
      return;
    }

    if (newQuantity < MIN_QUANTITY || newQuantity > MAX_QUANTITY) {
      setQuantityErrors(prev => ({
        ...prev,
        [productId]: `Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY}`
      }));
      return;
    }

    setQuantityErrors(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setItems([]);
    setOpenConfirmDialog(false);
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (Object.keys(quantityErrors).length > 0) {
      setError('Please fix quantity errors before proceeding');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => {
        const timerId = setTimeout(resolve, 1000);
        return () => clearTimeout(timerId);
      });
      navigate('/checkout');
    } catch (err) {
      setError('Failed to proceed to checkout');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate, quantityErrors]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {items.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any tracks to your cart yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => navigate('/')}
          >
            Browse Tracks
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table aria-label="Shopping cart">
                <TableHead>
                  <TableRow>
                    <TableCell>Track</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Duration</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.product.imageUrl ? (
                            <Box
                              component="img"
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              sx={{ width: 50, height: 50, mr: 2, objectFit: 'contain' }}
                            />
                          ) : (
                            <MusicNote sx={{ width: 40, height: 40, mr: 2, color: 'primary.main' }} />
                          )}
                          <Typography variant="subtitle1">{item.product.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={item.product.category} size="small" />
                      </TableCell>
                      <TableCell align="center">{item.product.duration}</TableCell>
                      <TableCell align="right">${item.product.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <FormControl error={!!quantityErrors[item.product.id]} size="small">
                          <TextField
                            id={`quantity-${item.product.id}`}
                            aria-label={`Quantity for ${item.product.name}`}
                            type="number"
                            size="small"
                            InputProps={{
                              inputProps: { min: MIN_QUANTITY, max: MAX_QUANTITY }
                            }}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                            sx={{ width: 70 }}
                          />
                          {quantityErrors[item.product.id] && (
                            <FormHelperText>{quantityErrors[item.product.id]}</FormHelperText>
                          )}
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color="error"
                startIcon={<Delete />}
                onClick={() => setOpenConfirmDialog(true)}
                disabled={items.length === 0}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal ({totalItems} items)</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Platform Fee ({PLATFORM_FEE_RATE * 100}%)</Typography>
                  <Typography>${platformFee.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0 || Object.keys(quantityErrors).length > 0}
                sx={{ mt: 2 }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                    Processing...
                  </Box>
                ) : 'Proceed to Checkout'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>

              {!isAuthenticated && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  You'll need to log in before checkout.
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Confirm Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Clear Cart?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to remove all items from your cart? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleClearCart} color="error" autoFocus>
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
