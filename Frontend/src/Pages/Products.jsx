import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, Container, Chip, Rating, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Tracks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [playing, setPlaying] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDarkMode = theme.palette.mode === 'dark';

    const tracksPerPage = 6;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    const togglePlay = (id) => {
        if (playing === id) {
            setPlaying(null);
        } else {
            setPlaying(id);
        }
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const allTracks = [
        {
            id: 1,
            title: 'Crimson Tempest',
            price: '$12.99',
            description: 'A relentless metal anthem that opens with thunderous double-bass drums and razor-sharp guitar riffs.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Metal',
            rating: 4.7,
            duration: '3:45',
            featured: true
        },
        {
            id: 2,
            title: 'Celestial Odyssey',
            price: '$20.99',
            description: 'A sweeping ambient cinematic journey that unfolds like a cosmic voyage through the vastness of space.',
            image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Ambient',
            rating: 4.9,
            duration: '5:12',
            featured: true
        },
        {
            id: 3,
            title: 'Backstreet Gramozie',
            price: '$5.99',
            description: 'Gentle pine forest ambience with distant birdsong and a soft morning breeze rustling through needles.',
            image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Nature',
            rating: 4.5,
            duration: '4:30',
            featured: true
        },
        {
            id: 4,
            title: 'Neon Tempo',
            price: '$8.99',
            description: 'Synthwave track with pulsing retro beats and glimmering arpeggios that evoke midnight drives through rain-slicked city streets.',
            image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Synthwave',
            rating: 4.6,
            duration: '4:15',
            featured: false
        },
        {
            id: 5,
            title: 'Desert Mirage',
            price: '$9.99',
            description: 'Middle Eastern-inspired electronic fusion with traditional instruments blended with modern production techniques.',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'World Fusion',
            rating: 4.8,
            duration: '6:20',
            featured: false
        },
        {
            id: 6,
            title: 'Urban Jungle',
            price: '$7.99',
            description: 'Hip-hop instrumental with jazzy samples, crisp beats and atmospheric city soundscapes in the background.',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Hip-Hop',
            rating: 4.4,
            duration: '3:50',
            featured: false
        },
        {
            id: 7,
            title: 'Quantum Ripples',
            price: '$14.99',
            description: 'Experimental electronic piece with glitchy textures, unconventional rhythms, and evolving synthesizer patterns.',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Experimental',
            rating: 4.2,
            duration: '7:15',
            featured: true
        },
        {
            id: 8,
            title: 'Morning Light',
            price: '$6.99',
            description: 'Gentle piano composition with warm string accompaniment that captures the peaceful essence of daybreak.',
            image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Classical',
            rating: 4.9,
            duration: '4:05',
            featured: false
        },
        {
            id: 9,
            title: 'Tribal Rhythms',
            price: '$11.99',
            description: 'Energetic percussion ensemble featuring traditional African drums with modern production elements.',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'World',
            rating: 4.7,
            duration: '5:30',
            featured: false
        },
        {
            id: 10,
            title: 'Electric Dreams',
            price: '$9.99',
            description: 'Upbeat EDM track with euphoric drops, soaring synth leads and infectious vocal chops.',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'EDM',
            rating: 4.5,
            duration: '3:25',
            featured: true
        },
        {
            id: 11,
            title: 'Midnight Jazz',
            price: '$8.49',
            description: 'Smooth jazz quartet recording with sultry saxophone solos and brushed drums perfect for late-night ambience.',
            image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Jazz',
            rating: 4.8,
            duration: '6:40',
            featured: false
        },
        {
            id: 12,
            title: 'Ocean Waves',
            price: '$4.99',
            description: 'Calming natural soundscape of gentle waves washing against a sandy shore with distant seagulls.',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Ambient',
            rating: 4.6,
            duration: '8:10',
            featured: false
        },
        {
            id: 13,
            title: 'Epic Journey',
            price: '$24.99',
            description: 'Orchestral film score with powerful brass, sweeping strings and heroic themes for adventure scenes.',
            image: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Cinematic',
            rating: 4.9,
            duration: '5:55',
            featured: true
        },
        {
            id: 14,
            title: 'Cybernetic Pulse',
            price: '$13.99',
            description: 'Dark techno track with industrial elements, distorted bass and mechanical percussion patterns.',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Techno',
            rating: 4.4,
            duration: '6:20',
            featured: false
        },
        {
            id: 15,
            title: 'Acoustic Memories',
            price: '$7.49',
            description: 'Intimate folk guitar and vocal performance with heartfelt lyrics about nostalgia and simpler times.',
            image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Folk',
            rating: 4.7,
            duration: '4:15',
            featured: false
        },
        {
            id: 16,
            title: 'Rainforest Canopy',
            price: '$6.99',
            description: 'Immersive soundscape featuring exotic birds, insects and gentle rainfall in a lush tropical setting.',
            image: 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Nature',
            rating: 4.5,
            duration: '10:20',
            featured: false
        },
        {
            id: 17,
            title: 'Digital Horizon',
            price: '$15.99',
            description: 'Progressive house track that builds gradually with layered synthesizers and a euphoric breakdown.',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'House',
            rating: 4.6,
            duration: '7:45',
            featured: true
        },
        {
            id: 18,
            title: 'Zen Flow',
            price: '$9.99',
            description: 'Meditative composition with traditional Japanese instruments, flowing water and subtle wind chimes.',
            image: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            genre: 'Meditation',
            rating: 4.8,
            duration: '9:30',
            featured: false
        }
    ];

    // Calculate pagination
    const totalPages = Math.ceil(allTracks.length / tracksPerPage);
    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = allTracks.slice(indexOfFirstTrack, indexOfLastTrack);

    return (
        <Container maxWidth="lg">
            <Box sx={{
                py: 5,
                color: theme.palette.text.primary,
                minHeight: '100vh'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                        Browse Audio Tracks
                    </Typography>
                    <Box>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Showing {indexOfFirstTrack + 1}-{Math.min(indexOfLastTrack, allTracks.length)} of {allTracks.length} tracks
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {currentTracks.map((track) => (
                        <Grid item xs={12} sm={6} md={4} key={track.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: isDarkMode
                                    ? 'rgba(38, 41, 64, 0.8)'
                                    : 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                color: theme.palette.text.primary,
                                boxShadow: track.featured
                                    ? `0 8px 24px ${isDarkMode ? 'rgba(63, 140, 244, 0.15)' : 'rgba(63, 140, 244, 0.25)'}`
                                    : theme.shadows[3],
                                borderRadius: 2,
                                position: 'relative',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: theme.shadows[8],
                                }
                            }}>
                                {track.featured && (
                                    <Chip
                                        label="Featured"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            fontWeight: 'bold',
                                            zIndex: 1
                                        }}
                                    />
                                )}
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={track.image}
                                        alt={track.title}
                                        sx={{
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8,
                                            filter: isDarkMode ? 'brightness(0.85)' : 'brightness(0.95)'
                                        }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        p: 1.5,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 'medium' }}>
                                            {track.duration}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => togglePlay(track.id)}
                                            sx={{
                                                backgroundColor: 'rgba(255,255,255,0.15)',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.main,
                                                }
                                            }}
                                        >
                                            {playing === track.id ? <PauseIcon /> : <PlayArrowIcon />}
                                        </IconButton>
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                            {track.title}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => toggleFavorite(track.id)}
                                            sx={{
                                                color: favorites.includes(track.id) ? 'red' : theme.palette.text.secondary,
                                                p: 0.5
                                            }}
                                        >
                                            {favorites.includes(track.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Chip
                                            label={track.genre}
                                            size="small"
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                                color: theme.palette.text.primary,
                                                mr: 1
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Rating
                                                value={track.rating}
                                                precision={0.1}
                                                size="small"
                                                readOnly
                                                sx={{
                                                    fontSize: '0.8rem',
                                                    color: theme.palette.primary.main
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ ml: 0.5, color: theme.palette.text.secondary }}>
                                                {track.rating}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 2,
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        lineHeight: '1.5',
                                        height: '4.5em'
                                    }}>
                                        {track.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                            {track.price}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<ShoppingCartIcon />}
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.dark
                                                },
                                                borderRadius: 6,
                                                px: 2
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                sx={{
                                    color: theme.palette.text.primary,
                                    '&.Mui-selected': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText
                                    }
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Container>
    );
};
export default Tracks;

