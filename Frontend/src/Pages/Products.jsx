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
            <Box sx={{ py: 5, color: 'white', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                        Browse Audio Tracks
                    </Typography>
                    <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
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
                                backgroundColor: 'rgba(38, 41, 64, 0.8)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                boxShadow: track.featured
                                    ? '0 8px 24px rgba(63, 140, 244, 0.15)'
                                    : '0 4px 12px rgba(0,0,0,0.15)',
                                borderRadius: 2,
                                position: 'relative',
                                p: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                                },
                                border: track.featured ? '1px solid rgba(63, 140, 244, 0.3)' : '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <Box sx={{ position: 'relative' }}>

                                    {track.featured && (
                                        <Chip
                                            label="Featured"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                zIndex: 1,
                                                fontSize: '0.7rem',
                                                height: 24
                                            }}
                                        />
                                    )}

                                    <CardMedia
                                        sx={{
                                            height: 180,
                                            borderRadius: 1.5,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mb: 2,
                                            overflow: 'hidden',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'rgba(0,0,0,0.2)',
                                                borderRadius: 1.5,
                                            }
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={track.image}
                                            alt={track.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)'
                                                }
                                            }}
                                        />
                                    </CardMedia>

                                    <Button
                                        variant="contained"
                                        onClick={() => togglePlay(track.id)}
                                        aria-label={playing === track.id ? "Pause track" : "Play track"}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            minWidth: '48px',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            color: '#1a1a2e',
                                            zIndex: 2,
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                                transform: 'translate(-50%, -50%) scale(1.1)',
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {playing === track.id ? <PauseIcon /> : <PlayArrowIcon />}
                                    </Button>

                                    <IconButton
                                        onClick={() => toggleFavorite(track.id)}
                                        aria-label={favorites.includes(track.id) ? "Remove from favorites" : "Add to favorites"}
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: favorites.includes(track.id) ? '#f43f5e' : 'white',
                                            zIndex: 2,
                                            padding: '6px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            }
                                        }}
                                    >
                                        {favorites.includes(track.id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Chip
                                        label={track.genre}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            color: 'rgba(255,255,255,0.8)',
                                            height: 22,
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                        {track.duration}
                                    </Typography>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                                    <Typography variant="h6" component="h3" gutterBottom sx={{
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.3,
                                        mb: 0.5
                                    }}>
                                        {track.title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating
                                            value={track.rating}
                                            precision={0.1}
                                            size="small"
                                            readOnly
                                            sx={{
                                                color: '#f59e0b',
                                                fontSize: '0.8rem'
                                            }}
                                        />
                                        <Typography variant="caption" sx={{ ml: 1, color: 'rgba(255,255,255,0.6)' }}>
                                            {track.rating}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h6" sx={{
                                        color: '#60a5fa',
                                        fontWeight: 'bold',
                                        mb: 1.5,
                                        fontSize: '1.1rem'
                                    }}>
                                        {track.price}
                                    </Typography>

                                    <Typography variant="body2" sx={{
                                        mb: 3,
                                        color: 'rgba(255,255,255,0.7)',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5
                                    }}>
                                        {track.description.length > 100
                                            ? `${track.description.substring(0, 100)}...`
                                            : track.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mt: 'auto',
                                        pt: 1,
                                        borderTop: '1px solid rgba(255,255,255,0.08)'
                                    }}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                borderColor: 'rgba(96, 165, 250, 0.5)',
                                                color: '#60a5fa',
                                                borderRadius: '50px',
                                                px: 2,
                                                py: 0.5,
                                                fontSize: '0.8rem',
                                                '&:hover': {
                                                    borderColor: '#60a5fa',
                                                    backgroundColor: 'rgba(96, 165, 250, 0.08)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            Details
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#3b82f6',
                                                borderRadius: '50%',
                                                minWidth: '36px',
                                                width: '36px',
                                                height: '36px',
                                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: '#60a5fa',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <ShoppingCartIcon fontSize="small" />
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {totalPages > 1 && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 6,
                        mb: 2
                    }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            shape="rounded"
                            size={isMobile ? "small" : "medium"}
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: item.selected ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                                        '&:hover': {
                                            backgroundColor: item.selected ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                                        },
                                        transition: 'background-color 0.2s ease',
                                        border: 'none',
                                        margin: '0 3px',
                                    }}
                                />
                            )}
                        />
                    </Box>
                )}

                <Typography variant="caption" sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    mt: 2
                }}>
                    Displaying page {currentPage} of {totalPages}
                </Typography>
            </Box>
        </Container>
    );
};
export default Tracks;