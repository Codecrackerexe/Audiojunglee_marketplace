import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, clearProductDetails } from '../Store/Slices/productSlice';
import { addToCart } from '../Store/Slices/cartSlice';
import { submitReview } from '../Store/Slices/reviewsSlice';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Rating,
    TextField,
    CardContent,
    Alert,
    Snackbar,
    Skeleton,
    CircularProgress
} from '@mui/material';
import { ShoppingCart, PersonOutline, CalendarToday } from '@mui/icons-material';
import AudioPlayer from '../Components/AudioPlayer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { product, loading, error } = useSelector(state => state.products);
    const { isAuthenticated } = useSelector(state => state.auth);
    const { reviews = [], reviewLoading = false } = useSelector(state => state.reviews || {});

    useEffect(() => {
        dispatch(fetchProductDetails(id));

        return () => {
            dispatch(clearProductDetails());
        };
    }, [dispatch, id]);

    const showSnackbar = useCallback((message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }, []);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            localStorage.setItem('postLoginAction', JSON.stringify({
                type: 'ADD_TO_CART',
                productId: id
            }));
            navigate('/login');
            return;
        }

        try {
            setIsAddingToCart(true);
            await dispatch(addToCart({ product, quantity: 1 })).unwrap();
            showSnackbar('Added to cart successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to add to cart', 'error');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!reviewText.trim()) {
            showSnackbar('Please enter a review', 'warning');
            return;
        }

        try {
            await dispatch(submitReview({
                productId: id,
                rating,
                text: reviewText
            })).unwrap();
            setReviewText('');
            setRating(5);
            showSnackbar('Review submitted successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to submit review', 'error');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Container sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Skeleton variant="text" height={60} width="80%" />
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <Skeleton variant="rectangular" width={100} height={30} sx={{ mr: 1 }} />
                                <Skeleton variant="rectangular" width={150} height={30} />
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="90%" />
                            <Skeleton variant="text" width="70%" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Skeleton variant="text" height={60} width="50%" />
                            <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="70%" />
                            <Skeleton variant="text" width="90%" />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='error'>
                    {typeof error === 'object' && error !== null
                        ? Object.values(error).flat().join(', ')
                        : typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.'}
                </Alert>
                <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => dispatch(fetchProductDetails(id))}
                    aria-label="Try loading product again"
                >
                    Try Again
                </Button>
            </Container>
        );
    };

    if (!product) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="warning">
                    <Typography variant='h5'>Product not found</Typography>
                    <Typography variant='body1'>The product you're looking for may have been removed or is unavailable.</Typography>
                </Alert>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/products')}
                    aria-label="Browse products"
                >
                    Browse Products
                </Button>
            </Container>
        );
    }

    const getAudioProperty = (property, fallback = 'N/A') => {
        if (!product.audio_file) return fallback;

        try {
            const props = property.split('.');
            let value = product.audio_file;

            for (const prop of props) {
                if (value === null || value === undefined || !Object.prototype.hasOwnProperty.call(value, prop)) {
                    return fallback;
                }
                value = value[prop];
            }

            return value === null || value === undefined ? fallback : value;
        } catch (error) {
            console.error(`Error accessing audio property ${property}:`, error);
            return fallback;
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return 'N/A';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
                        <Typography variant='h4' component="h1" gutterBottom>
                            {product.title}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", mb: 2 }}>
                            <Chip
                                label={product.category_name}
                                color="primary"
                                size='small'
                                sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 }, mr: { xs: 2, sm: 0 }, mb: { xs: 1, sm: 0 } }}>
                                <PersonOutline sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant='body2' color="text.secondary">
                                    {product.seller_username}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", ml: { xs: 0, sm: 2 } }}>
                                <CalendarToday sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant='body2' color='text.secondary'>
                                    {new Date(product.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        {product.audio_file && (
                            <Box sx={{ my: 3 }}>
                                <AudioPlayer
                                    audioUrl={product.audio_file}
                                    title={product.title}
                                />
                            </Box>
                        )}
                        <Typography variant='h6' gutterBottom>
                            Description
                        </Typography>
                        <Typography variant='body1'>
                            {product.description || 'No description available for this product.'}
                        </Typography>

                        {product.audio_file && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant='h6' gutterBottom>
                                    Audio Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant='body2' color='text.secondary'>Format</Typography>
                                        <Typography variant='body1'>{getAudioProperty('format')}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                                        <Typography variant="body1">
                                            {formatDuration(getAudioProperty('duration'))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="body2" color="text.secondary">Quality</Typography>
                                        <Typography variant="body1">
                                            {getAudioProperty('bitrate') ? `${getAudioProperty('bitrate')} kbps` : 'N/A'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Paper>

                    {/* Reviews section */}
                    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                        <Typography variant="h5" gutterBottom>
                            Reviews
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        {/* Review form for authenticated users */}
                        {isAuthenticated ? (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" gutterBottom>
                                    Add Your Review
                                </Typography>
                                <Box component="form" onSubmit={handleReviewSubmit}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography component="legend">Your Rating</Typography>
                                        <Rating
                                            name="rating"
                                            value={rating}
                                            onChange={(e, newValue) => setRating(newValue)}
                                            precision={1}
                                            aria-label="Product rating"
                                        />
                                    </Box>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Your review"
                                        variant="outlined"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        sx={{ mb: 2 }}
                                        required
                                        aria-label="Review text"
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={reviewLoading}
                                        aria-label="Submit review"
                                    >
                                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ mb: 4 }}>
                                <Alert severity="info">
                                    Please <Button
                                        color="primary"
                                        onClick={() => navigate('/login')}
                                        sx={{ mx: 1, p: 0, minWidth: 'auto' }}
                                        aria-label="Login to leave review"
                                    >login</Button> to leave a review.
                                </Alert>
                            </Box>
                        )}

                        {/* Displaying reviews */}
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Box key={review.id || `review-${review.username}-${review.created_at}`} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="subtitle1">{review.username}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                        <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                                        <Typography variant="body2">
                                            {review.text}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                                No reviews yet. Be the first to review this product!
                            </Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, position: 'sticky', top: 20 }}>
                        <Typography variant="h4" component="div" gutterBottom>
                            ${parseFloat(product.price).toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={isAddingToCart ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            sx={{ mb: 2 }}
                            aria-label="Add product to cart"
                        >
                            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                        </Button>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            ✓ Instant digital delivery
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ✓ Secure payment
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ✓ Full usage rights
                        </Typography>

                        {product.license_details && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    License Information:
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {product.license_details}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                aria-live="polite"
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProductDetail;