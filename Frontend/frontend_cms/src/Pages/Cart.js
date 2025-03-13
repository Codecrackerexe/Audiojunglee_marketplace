import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../Store/Slices/cartSlice';
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
  DialogTitle
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  
  const cartTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [items]);
  
  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (err) {
      setError("Failed to remove item. Please try again.");
    }
  };
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 50) return;
    
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
    setOpenConfirmDialog(false);
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/checkout');
    } catch (err) {
      setError('Failed to proceed to checkout');
    } finally {
      setIsLoading(false);
    }
  };
  
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
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
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
                          {item.product.imageUrl && (
                            <Box 
                              component="img"
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              sx={{ width: 50, height: 50, mr: 2, objectFit: 'contain' }}
                            />
                          )}
                          <Typography>{item.product.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">${item.product.price}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Button
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            -
                          </Button>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 1 && value <= 99) {
                                handleQuantityChange(item.product.id, value);
                              }
                            }}
                            inputProps={{ 
                              min: 1, 
                              max: 99,
                              style: { textAlign: 'center' } 
                            }}
                            sx={{ width: 60, mx: 1 }}
                            aria-label={`Quantity of ${item.product.name}`}
                          />
                          <Button
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            +
                          </Button>
                        </Box>
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
                variant="outlined"
                color="error"
                onClick={() => setOpenConfirmDialog(true)}
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
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1">$0.00</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Estimated Delivery
                </Typography>
                <Typography variant="body1">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
              
              {!isAuthenticated && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please log in to proceed with checkout.
                </Alert>
              )}
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Clear your cart?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all items from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleClearCart} 
            color="error"
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;