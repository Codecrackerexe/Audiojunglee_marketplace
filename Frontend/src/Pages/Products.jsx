import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const FeaturedTracks = () => {
    const tracks = [
        {
            id: 1,
            title: 'Crimson Tempest',
            price: '$12.99',
            description: 'A relentless metal anthem that opens with thunderous double-bass drums and razor-sharp guitar riffs.',
            image: 'https://flypaper.soundfly.com/wp-content/uploads/2016/10/metal-covers-header-1024x683.png'
        },
        {
            id: 2,
            title: 'Celestial Odyssey',
            price: '$20.99',
            description: 'A sweeping ambient cinematic journey that unfolds like a cosmic voyage through the vastness of space.',
            image: 'https://i.pinimg.com/originals/a4/32/cd/a432cdf28ad9023bb5852229ba3b1484.jpg'
        },
        {
            id: 3,
            title: 'Whispering Pines at Dawn',
            price: '$5.99',
            description: 'Gentle pine forest ambience with distant birdsong and a soft morning breeze rustling through needles.',
            image: 'https://i.ytimg.com/vi/kFxwxIH0inM/maxresdefault.jpg'
        }
    ];

    return (
        <Box sx={{ py: 4, backgroundColor: '#1e2130', color: 'white', minHeight: '100vh', px: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 4, fontWeight: 'normal' }}>
                Found {tracks.length} tracks
            </Typography>

            <Grid container spacing={3}>
                {tracks.map((track) => (
                    <Grid item xs={12} sm={6} md={4} key={track.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'transparent',
                            color: 'white',
                            boxShadow: 'none',
                            position: 'relative',
                        }}>
                            <CardMedia
                                sx={{
                                    height: 150,
                                    backgroundColor: '#2742b6',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mb: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Display the image assigned to the urls */}
                                <Box
                                    component="img"
                                    src={track.image}
                                    alt={track.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </CardMedia>

                            <CardContent sx={{ flexGrow: 1, p: 0 }}>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {track.title}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 'bold', mb: 1 }}>
                                    {track.price}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 3, color: '#94a3b8', fontSize: '0.9rem' }}>
                                    {track.description.length > 100
                                        ? `${track.description.substring(0, 100)}...`
                                        : track.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#3b82f6',
                                            color: '#3b82f6',
                                            borderRadius: '50px',
                                            px: 3,
                                            '&:hover': {
                                                borderColor: '#60a5fa'
                                            }
                                        }}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '50%',
                                            minWidth: '40px',
                                            width: '40px',
                                            height: '40px',
                                            '&:hover': {
                                                backgroundColor: '#60a5fa'
                                            }
                                        }}
                                    >
                                        <ShoppingCartIcon />
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                    count={1}
                    shape="rounded"
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            sx={{
                                color: 'white',
                                backgroundColor: item.selected ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                                '&:hover': {
                                    backgroundColor: item.selected ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                                }
                            }}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default FeaturedTracks;