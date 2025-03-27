import React, { memo } from 'react';
import { Box, Container, Typography, Grid, Divider, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';


const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: '#0a0a0a',
        color: '#f5f5f5',
        py: { xs: 6, md: 8 },
        mt: { xs: 6, md: 10 },
        boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(63,140,244,0) 0%, rgba(63,140,244,0.3) 50%, rgba(63,140,244,0) 100%)',
        },
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(25, 25, 25, 0.3) 0%, rgba(10, 10, 10, 0) 25%)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)'
                }
              }}
            >
              <MusicNoteIcon
                sx={{
                  fontSize: { xs: 28, md: 32 },
                  mr: 1.5,
                  color: '#3f8cf4',
                  filter: 'drop-shadow(0 0 2px rgba(63,140,244,0.4))'
                }}
                aria-hidden="true"
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(45deg, #3f8cf4 30%, #64b5f6 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(63,140,244,0.1)'
                }}
              >
                AudioJunglee
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mb: 2,
                ml: 0.5,
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.5px',
                fontStyle: 'italic'
              }}
            >
              Sound for the digital soul
            </Typography>
            <Typography
              variant='body2'
              sx={{
                mb: 3,
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.75)',
                maxWidth: { xs: '100%', md: '90%' }
              }}
            >
              Your one-stop destination for premium licensed music and audio tracks. Discover, stream, and download high-quality sound for all your creative projects.
            </Typography>
            <Box
              sx={{
                mt: 4,
                p: 1.5,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.02)',
                display: 'inline-block'
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}
              >
                <IconButton
                  aria-label="Visit our Facebook page"
                  size="small"
                  sx={{
                    color: '#f5f5f5',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#4267B2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(66, 103, 178, 0.2)'
                    }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  aria-label="Visit our Twitter page"
                  size="small"
                  sx={{
                    color: '#f5f5f5',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#1DA1F2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(29, 161, 242, 0.2)'
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  aria-label="Visit our Instagram page"
                  size="small"
                  sx={{
                    color: '#f5f5f5',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#C13584',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(193, 53, 132, 0.2)'
                    }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label="Visit our YouTube channel"
                  size="small"
                  sx={{
                    color: '#f5f5f5',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#FF0000',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)'
                    }
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: '600',
                mb: 3,
                letterSpacing: '0.5px',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '2rem',
                  height: '2px',
                  background: 'linear-gradient(90deg, #3f8cf4, transparent)',
                }
              }}
            >
              Quick Links
            </Typography>
            <Link
              component={RouterLink}
              to="/"
              color='inherit'
              sx={{
                display: 'block',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="Go to home page"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/login"
              color="inherit"
              sx={{
                display: 'block',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="Go to login page"
            >
              Login
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              color="inherit"
              sx={{
                display: 'block',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="Go to registration page"
            >
              Register
            </Link>
            <Link
              component={RouterLink}
              to="/products"
              color="inherit"
              sx={{
                display: 'block',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="Browse our audio tracks"
            >
              Browse Tracks
            </Link>

            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: '600',
                mt: 4,
                mb: 3,
                letterSpacing: '0.5px',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '2rem',
                  height: '2px',
                  background: 'linear-gradient(90deg, #3f8cf4, transparent)',
                }
              }}
            >
              Legal
            </Typography>
            <Link
              component={RouterLink}
              to="/privacy"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="View our privacy policy"
            >
              <PrivacyTipIcon sx={{ fontSize: 16, mr: 1 }} />
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color: '#3f8cf4', pl: 0.5 }
              }}
              aria-label="View our terms of service"
            >
              <GavelIcon sx={{ fontSize: 16, mr: 1 }} />
              Terms of Service
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: '600',
                mb: 3,
                letterSpacing: '0.5px',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '2rem',
                  height: '2px',
                  background: 'linear-gradient(90deg, #3f8cf4, transparent)',
                }
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                Have questions or need assistance? Reach out to our support team.
              </Typography>
              <Link
                href="mailto:support@audiojunglee.com"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  color: '#3f8cf4',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    filter: 'brightness(1.2)'
                  }
                }}
              >
                <Box component="span" sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  p: 0.75,
                  borderRadius: '50%',
                  bgcolor: 'rgba(63, 140, 244, 0.1)'
                }}>
                  <EmailIcon sx={{ fontSize: 18 }} />
                </Box>
                support@audiojunglee.com
              </Link>

              <Link
                href="tel:+919876543210"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#3f8cf4',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    filter: 'brightness(1.2)'
                  }
                }}
              >
                <Box component="span" sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  p: 0.75,
                  borderRadius: '50%',
                  bgcolor: 'rgba(63, 140, 244, 0.1)'
                }}>
                  <PhoneIcon sx={{ fontSize: 18 }} />
                </Box>
                +91 987-654-3210
              </Link>            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            &copy; {new Date().getFullYear()} AudioJunglee. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Footer);


