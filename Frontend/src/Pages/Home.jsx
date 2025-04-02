import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../Store/Slices/productSlice';
import { fetchCategories } from '../Store/Slices/categorySlice';
import { addToCart } from '../Store/Slices/cartSlice';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  CircularProgress,
  Chip,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Tooltip,
  Slider,
  useTheme,
  useMediaQuery,
  Collapse,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  ShoppingCart as CartIcon,
  MusicNote as MusicIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Headphones as HeadphonesIcon
} from '@mui/icons-material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filtersOpen, setFiltersOpen] = useState(!isMobile);

  const [filters, setFilters] = useState({
    category: query.get('category') || '',
    search: query.get('search') || '',
    minPrice: '',
    maxPrice: '',
    page: parseInt(query.get('page')) || 1
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const { products = [], loading = false, pagination = {} } = useSelector(state => state.products || {});
  const categories = useSelector(state => state.categories?.categories || []);

  useEffect(() => {
    dispatch(fetchProducts({
      category: filters.category,
      search: filters.search,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: filters.page,
    }));
    dispatch(fetchCategories());
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1 // reset to 1 when filters change
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyPriceRange = () => {
    setFilters({
      ...filters,
      minPrice: priceRange[0] || '',
      maxPrice: priceRange[1] || '',
      page: 1
    });
  };

  const handlePageChange = (event, value) => {
    setFilters({
      ...filters,
      page: value
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Update URL with search parameters
    const searchParams = new URLSearchParams();
    if (filters.search) searchParams.set('search', filters.search);
    if (filters.category) searchParams.set('category', filters.category);
    if (filters.minPrice) searchParams.set('minPrice', filters.minPrice);
    if (filters.maxPrice) searchParams.set('maxPrice', filters.maxPrice);

    navigate(`/?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
    });
    setPriceRange([0, 1000]);
    navigate('/');
  };

  const handleAddToCart = (productData) => {
    dispatch(addToCart({
      product: productData,
      quantity: 1
    }));
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            mb: 1
          }}
        >
          <HeadphonesIcon sx={{ mr: 1, fontSize: 35 }} />
          Discover Music
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Browse our collection of high-quality audio tracks for all your creative needs
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Filters sidebar */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              height: filtersOpen ? 'auto' : 'auto',
              transition: 'all 0.3s'
            }}
          >
            <Box sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Filters</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={toggleFilters}
                sx={{ color: 'white' }}
              >
                {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={filtersOpen}>
              <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search tracks..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: filters.search ? (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setFilters({ ...filters, search: '' })}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  }}
                />

                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={filters.category}
                    label="Category"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Ambient">Ambient</MenuItem>
                    <MenuItem value="Electronic">Electronic</MenuItem>
                    <MenuItem value="Hip Hop">Hip Hop</MenuItem>
                    <MenuItem value="Jazz">Jazz</MenuItem>
                    <MenuItem value="Rock">Rock</MenuItem>
                    <MenuItem value="Classical">Classical</MenuItem>
                    <MenuItem value="Lo-Fi">Lo-Fi</MenuItem>
                    <MenuItem value="Cinematic">Cinematic</MenuItem>
                    <MenuItem value="Bollywood">Bollywood</MenuItem>

                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ mt: 3 }}>
                  <Typography id="price-range-slider" gutterBottom>
                    Price Range
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    onChangeCommitted={applyPriceRange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    aria-labelledby="price-range-slider"
                    sx={{ mt: 3, mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[1]}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{
                    mb: 1.5,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}
                  startIcon={<SearchIcon />}
                >
                  Apply Filters
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ py: 1.2, borderRadius: 2 }}
                  onClick={clearFilters}
                  startIcon={<ClearIcon />}
                >
                  Clear Filters
                </Button>
              </Box>
            </Collapse>
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Fade in={!loading}>
              <Box>
                {products && products.length > 0 ? (
                  <>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="text.secondary">
                        Local tracks from device :
                      </Typography>
                      {isMobile && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FilterIcon />}
                          onClick={toggleFilters}
                        >
                          Filters
                        </Button>
                      )}
                    </Box>

                    <Grid container spacing={3}>
                      {products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 2,
                              overflow: 'hidden',
                              transition: 'all 0.3s',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: theme.shadows[8],
                              }
                            }}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                pt: '56.25%', // for aspect ratio
                                position: 'relative',
                                bgcolor: 'primary.dark',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <MusicIcon
                                sx={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  fontSize: 60,
                                  color: 'rgba(255,255,255,0.8)'
                                }}
                              />
                              {product.isNew && (
                                <Chip
                                  label="NEW"
                                  color="secondary"
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    fontWeight: 'bold'
                                  }}
                                />
                              )}
                            </CardMedia>
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                sx={{
                                  fontWeight: 'bold',
                                  minHeight: '2.5em',
                                  maxHeight: '2.5em',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  lineHeight: 1.2,
                                  wordBreak: 'break-word',
                                }}
                              >
                                {product.title}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography
                                  variant="h6"
                                  color="primary.main"
                                  sx={{ fontWeight: 'bold' }}
                                >
                                  ${product.price}
                                </Typography>
                                <Chip
                                  label={product.category_name}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                />
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  height: '4.5em',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  mb: 2
                                }}
                              >
                                {product.description}
                              </Typography>
                            </CardContent>

                            <Box sx={{ p: 2, pt: 0, display: 'flex' }}>
                              <Button
                                component={RouterLink}
                                to={`/products/${product.id}`}
                                variant="outlined"
                                sx={{
                                  flexGrow: 1,
                                  mr: 1,
                                  borderRadius: 2,
                                  fontWeight: 'medium'
                                }}
                              >
                                Details
                              </Button>
                              <Tooltip title="Add to cart">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{ borderRadius: 2 }}
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <CartIcon />
                                </Button>
                              </Tooltip>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Pagination */}
                    {pagination && pagination.count > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                        <Pagination
                          count={Math.ceil(pagination.count / 10)}
                          page={filters.page}
                          onChange={handlePageChange}
                          color="primary"
                          size="large"
                          showFirstButton
                          showLastButton
                          variant="outlined"
                          sx={{
                            '& .MuiPaginationItem-root': {
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <Paper
                    sx={{
                      p: 5,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <MusicIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h5" gutterBottom>No tracks found</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      We couldn't find any audio tracks matching your filters.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={clearFilters}
                      startIcon={<ClearIcon />}
                    >
                      Clear Filters
                    </Button>
                  </Paper>
                )}
              </Box>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
