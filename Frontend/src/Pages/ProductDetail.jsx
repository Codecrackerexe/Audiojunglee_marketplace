import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, clearProductDetails, fetchAudioMetadata } from '../Store/Slices/productSlice';
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

    const { product, loading, audioDetails, audioMetadataLoading, error } = useSelector(state => state.products);
    const { isAuthenticated } = useSelector(state => state.auth);
    const { reviews = [], reviewLoading = false } = useSelector(state => state.reviews || {});

    useEffect(() => {
        if (id && id !== 'undefined') {
            dispatch(fetchProductDetails(id));
        }

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
            // Using id consistently (from URL params)
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
    if (loading || !id || id === 'undefined') {
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
                {/* Added a back button for better navigation */}
                <Button
                    variant="text"
                    sx={{ mt: 2, ml: 2 }}
                    onClick={() => navigate('/products')}
                    aria-label="Back to products"
                >
                    Back to Products
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

    const formatDuration = (seconds) => {
        if (!seconds) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const hasAudioDetails = product.audio_file && audioDetails;

    return (
        <Container sx={{ py: 4 }}>
            {/* Added Snackbar component that was missing */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
                        <Typography variant='h4' component="h1" gutterBottom>
                            {product.title}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", mb: 2 }}>
                            <Chip
                                label={product.category_name || product.category}
                                color="primary"
                                size='small'
                                sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 }, mr: { xs: 2, sm: 0 }, mb: { xs: 1, sm: 0 } }}>
                                <PersonOutline sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant='body2' color="text.secondary">
                                    {product.seller_username || product.owner_username || "Unknown seller"}
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

                        {/* Added loading state for audio player */}
                        {product.audio_file && (
                            <Box sx={{ my: 3 }}>
                                <AudioPlayer
                                    audioUrl={product.audio_file}
                                    title={product.title}
                                    isLoading={audioMetadataLoading}
                                />
                            </Box>
                        )}
                        <Typography variant='h6' gutterBottom>
                            Description
                        </Typography>
                        <Typography variant='body1'>
                            {product.description || 'No description available for this product.'}
                        </Typography>

                        {/* Improved audio details section with loading state */}
                        {product?.audio_file && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant='h6' gutterBottom>
                                    Audio Details
                                </Typography>
                                {audioMetadataLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                        <CircularProgress size={24} />
                                    </Box>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant='body2' color='text.secondary'>Format</Typography>
                                            <Typography variant='body1'>
                                                {audioDetails?.file_format || audioDetails?.format || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Duration</Typography>
                                            <Typography variant="body1">
                                                {audioDetails ? formatDuration(audioDetails.duration) : 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Quality</Typography>
                                            <Typography variant="body1">
                                                {audioDetails?.bit_rate || audioDetails?.bitrate ?
                                                    `${audioDetails?.bit_rate || audioDetails?.bitrate} kbps` : 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Sample Rate</Typography>
                                            <Typography variant="body1">
                                                {audioDetails?.sample_rate ? `${audioDetails.sample_rate} Hz` : 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Channels</Typography>
                                            <Typography variant="body1">
                                                {audioDetails?.channels || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="body2" color="text.secondary">File Size</Typography>
                                            <Typography variant="body1">
                                                {audioDetails?.file_size ?
                                                    `${(audioDetails.file_size / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
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
                            <Box sx={{ mb: 4 }} component="form" onSubmit={handleReviewSubmit}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Write a Review
                                </Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    placeholder="Share your thoughts about this product..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={reviewLoading}
                                >
                                    {reviewLoading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        'Submit Review'
                                    )}
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ mb: 3 }}>
                                <Alert severity="info">
                                    Please <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => navigate('/login')}
                                    >
                                        log in
                                    </Button> to write a review.
                                </Alert>
                            </Box>
                        )}
                        {/* Display existing reviews */}
                        {/* Added handling for empty reviews */}
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Paper
                                    key={review.id}
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        backgroundColor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
                                                {review.user_name || 'Anonymous'}
                                            </Typography>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1">
                                        {review.text}
                                    </Typography>
                                </Paper>
                            ))
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 3 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No reviews yet. Be the first to review this product!
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Product pricing and add to cart section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, position: 'sticky', top: 20 }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            ${typeof product.price === 'number'
                                ? product.price.toFixed(2)
                                : parseFloat(product.price).toFixed(2)}
                        </Typography>
                        {/*Added better handling for add to cart button states */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<ShoppingCart />}
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            sx={{ mb: 2 }}
                        >
                            {isAddingToCart ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add to Cart'
                            )}
                        </Button>

                        {/*Added product info summary for better UX */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Product Summary
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Category:</Typography>
                                <Typography variant="body2">{product.category_name || product.category}</Typography>
                            </Box>
                            {product.audio_file && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">Format:</Typography>
                                    <Typography variant="body2">
                                        {audioDetails?.file_format || audioDetails?.format || 'Audio file'}
                                    </Typography>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Seller:</Typography>
                                <Typography variant="body2">
                                    {product.seller_username || product.owner_username || "Unknown"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Date Added:</Typography>
                                <Typography variant="body2">
                                    {new Date(product.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
