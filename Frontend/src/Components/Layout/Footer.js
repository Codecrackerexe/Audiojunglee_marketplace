import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Footer = () => {
  return (
    <Box 
      component='footer' 
      sx={{
        bgcolor: '#121212',
        color: 'white',
        py: 6,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        mt: 8,
        boxShadow: '0px -5px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MusicNoteIcon sx={{ fontSize: 30, mr: 1, color: '#2196f3' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AudioJunglee
              </Typography>
            </Box>
            <Typography
              variant='body2'
              sx={{
                mb: 2,
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Your one-stop shop for licensed tunes and funky grooves. Discover, stream, and download high-quality audio tracks for all your creative needs.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="facebook" sx={{ color: '#4267B2' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" sx={{ color: '#1DA1F2' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" sx={{ color: '#C13584' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="youtube" sx={{ color: '#FF0000' }}>
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="/" color='inherit' sx={{ 
              display: 'block', 
              mb: 1.5, 
              textDecoration: 'none',
              '&:hover': { color: '#2196f3', pl: 0.5, transition: 'all 0.2s' } 
            }}>
              Home
            </Link>
            <Link href="/login" color="inherit" sx={{ 
              display: 'block', 
              mb: 1.5, 
              textDecoration: 'none',
              '&:hover': { color: '#2196f3', pl: 0.5, transition: 'all 0.2s' } 
            }}>
              Login
            </Link>
            <Link href="/register" color="inherit" sx={{ 
              display: 'block', 
              mb: 1.5, 
              textDecoration: 'none',
              '&:hover': { color: '#2196f3', pl: 0.5, transition: 'all 0.2s' } 
            }}>
              Register
            </Link>
            <Link href="/products" color="inherit" sx={{ 
              display: 'block', 
              mb: 1.5, 
              textDecoration: 'none',
              '&:hover': { color: '#2196f3', pl: 0.5, transition: 'all 0.2s' } 
            }}>
              Browse Tracks
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(255,255,255,0.05)', 
              borderRadius: 2,
              '&:hover': { 
                bgcolor: 'rgba(255,255,255,0.08)',
                transform: 'translateY(-3px)',
                transition: 'all 0.3s'
              }
            }}>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Phone:</Box> +1 (123) 456-7890
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Email:</Box> support@audiojunglee.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} AudioJunglee. All rights reserved.
          </Typography>
          <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
            Designed with ♥ for music lovers everywhere
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;