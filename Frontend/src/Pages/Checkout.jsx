import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Store/Slices/cartSlice';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Divider,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert
} from '@mui/material';

const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

const Checkout = () => {
    const [activeStep, setActivestep] = useState(0);
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [orderComplete, setOrderComplete] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, total } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    const handleShippingChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handlePlaceOrder();
        } else {
            setActivestep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActivestep((prevStep) => prevStep - 1);
    };

    const handlePlaceOrder = () => {
        setTimeout(() => {
            setOrderComplete(true);
            dispatch(clearCart());
        }, 1500);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    value={shippingInfo.firstName}
                                    name='firstName'
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name='lastName'
                                    value={shippingInfo.lastName}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type='email'
                                    value={shippingInfo.email || user?.email || ''}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Address"
                                    name='address'
                                    value={shippingInfo.address || user?.address || ''}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="State/Province"
                                    name='state'
                                    value={shippingInfo.state}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="ZIP / Postal code"
                                    name="zipCode"
                                    value={shippingInfo.zipCode}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={shippingInfo.country}
                                    onChange={handleShippingChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 3 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                            >
                                <FormControlLabel
                                    value="credit_card"
                                    control={<Radio />}
                                    label="Credit Card"
                                />
                                <FormControlLabel
                                    value="paypal"
                                    control={<Radio />}
                                    label="PayPal"
                                />
                                <FormControlLabel
                                    value="bank_transfer"
                                    control={<Radio />}
                                    label="Bank Transfer"
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'credit_card' && (
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Card Number"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Expiry Date"
                                        placeholder="MM/YY"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="CVV"
                                        placeholder="123"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Cardholder Name"
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>

                        <List disablePadding>
                            {items.map((item) => (
                                <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                                    <ListItemText
                                        primary={item.product.title}
                                        secondary={`Quantity: ${item.quantity}`}
                                    />
                                    <Typography variant="body2">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </ListItem>
                            ))}

                            <Divider sx={{ my: 2 }} />
                            <Divider sx={{ my: 2 }} />
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    ${total ? total.toFixed(2) : '0.00'}
                                </Typography>
                            </ListItem>
                        </List>

                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Shipping
                                </Typography>
                                <Typography gutterBottom>{shippingInfo.firstName} {shippingInfo.lastName}</Typography>
                                <Typography gutterBottom>{shippingInfo.address}</Typography>
                                <Typography gutterBottom>
                                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                                </Typography>
                                <Typography gutterBottom>{shippingInfo.country}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Payment Details
                                </Typography>
                                <Typography gutterBottom>
                                    {paymentMethod === 'credit_card' && 'Credit Card'}
                                    {paymentMethod === 'paypal' && 'PayPal'}
                                    {paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    // If order is complete, show success message
    if (orderComplete) {
        return (
            <Container sx={{ py: 8 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Your order has been placed successfully!
                    </Alert>
                    <Typography variant="h5" gutterBottom>
                        Thank you for your order
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Your order number is #2001539. We have emailed your order confirmation,
                        and will send you an update when your order has shipped.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{ mt: 3 }}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Checkout
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        {getStepContent(activeStep)}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mr: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>

                        <List disablePadding>
                            {items.map((item) => (
                                <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                                    <ListItemText
                                        primary={item.product.title}
                                        secondary={`Quantity: ${item.quantity}`}
                                    />
                                    <Typography variant="body2">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </ListItem>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    ${total ? total.toFixed(2) : '0.00'}
                                </Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;