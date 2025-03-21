import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slices/authSlice';
import { useColorMode } from './Layout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  Toolbar,
  Tooltip,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Container,
  useScrollTrigger,
  Slide,
  ListItemIcon,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Person as ProfileIcon,
  Dashboard as DashboardIcon,
  MusicNote as MusicIcon,
  Headphones as HeadphonesIcon,
} from '@mui/icons-material';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  backdropFilter: 'blur(12px)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.18),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create(['width', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.8),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '24ch',
      '&:focus': {
        width: '34ch',
        backgroundColor: alpha(theme.palette.common.white, 0.1),
      },
    },
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(0.8, 2),
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: 'translateY(-2px)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '-0.01em',
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(45deg, #FFFFFF 30%, #E0F7FA 90%)'
    : 'linear-gradient(45deg, #FFFFFF 30%, #90CAF9 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginLeft: theme.spacing(1),
  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${alpha(theme.palette.background.paper, 0.9)}`,
    transition: 'all 0.2s',
    minWidth: 18,
    height: 18,
    padding: '0 5px',
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { mode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth || {});
  const isAuthenticated = auth.isAuthenticated || false;
  const user = auth.user || {};

  const cart = useSelector(state => state.cart || {});
  const items = cart.items || [];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar
          position='fixed'
          elevation={0}
          sx={{
            background: mode === 'light'
              ? 'linear-gradient(135deg, #3a86ff 0%, #4f46e5 100%)'
              : 'linear-gradient(135deg, #1e40af 0%, #4338ca 100%)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha(mode === 'light' ? '#ffffff' : '#000000', 0.1)}`,
            boxShadow: mode === 'light'
              ? '0 4px 20px rgba(79, 70, 229, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ padding: { xs: '8px 0', sm: '8px 0' }, minHeight: { xs: 64, sm: 70 } }}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer(true)}
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  color: 'white',
                  '&:hover': { transform: 'scale(1.05)' },
                  transition: 'transform 0.2s',
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HeadphonesIcon
                  fontSize="large"
                  sx={{
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
                <LogoText
                  variant='h5'
                  noWrap
                  component={RouterLink}
                  to="/"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    textDecoration: 'none',
                    fontSize: { sm: '1.5rem', md: '1.7rem' },
                  }}
                >
                  AudioJunglee
                </LogoText>
              </Box>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search for music...'
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </Search>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <NavButton
                  color="inherit"
                  component={RouterLink}
                  to="/"
                  startIcon={<HomeIcon />}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  Home
                </NavButton>
                <Tooltip title="View Cart">
                  <IconButton
                    size='large'
                    color='inherit'
                    component={RouterLink}
                    to="/cart"
                    sx={{
                      mx: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: alpha('#ffffff', 0.1),
                      }
                    }}
                  >
                    <StyledBadge badgeContent={items.length} color='secondary'>
                      <ShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>


                {isAuthenticated ? (
                  <>
                    <Tooltip title="Account Menu">
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        sx={{
                          ml: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            background: alpha('#ffffff', 0.1),
                          }
                        }}
                      >
                        {user?.avatar ? (
                          <Avatar
                            src={user.avatar}
                            alt={user.username}
                            sx={{
                              width: 36,
                              height: 36,
                              border: '2px solid white',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                          />
                        ) : (
                          <AccountCircle sx={{ fontSize: 32 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          borderRadius: 3,
                          minWidth: 200,
                          mt: 1,
                          overflow: 'visible',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.05)',
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                          '& .MuiMenuItem-root': {
                            px: 2,
                            py: 1.2,
                            borderRadius: 2,
                            mx: 0.5,
                            my: 0.3,
                            transition: 'all 0.1s',
                          },
                        }
                      }}
                    >
                      <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                        <ListItemIcon>
                          <ProfileIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </MenuItem>
                      {user?.role === 'admin' && (
                        <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
                          <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Admin Dashboard" />
                        </MenuItem>
                      )}
                      <Divider sx={{ my: 1 }} />
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <NavButton
                      color='inherit'
                      component={RouterLink}
                      to="/login"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Login
                    </NavButton>
                    <NavButton
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      sx={{
                        bgcolor: alpha('#ffffff', 0.9),
                        color: mode === 'light' ? '#3a86ff' : '#1e40af',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Register
                    </NavButton>
                  </>
                )}
                <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                  <IconButton
                    onClick={toggleColorMode}
                    color="inherit"
                    sx={{
                      ml: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: alpha('#ffffff', 0.1),
                      }
                    }}
                  >
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '0 16px 16px 0',
            background: mode === 'light'
              ? 'linear-gradient(135deg, #3a86ff 0%, #4f46e5 100%)'
              : 'linear-gradient(135deg, #1e40af 0%, #4338ca 100%)',
            color: 'white',
            boxShadow: '0 0 30px rgba(0,0,0,0.2)',
          }
        }}
      >
        <Box
          sx={{ width: '100%' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            pb: 2.5,
          }}>
            <HeadphonesIcon
              fontSize="large"
              sx={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
            />
            <Typography
              variant="h5"
              sx={{
                ml: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FFFFFF 30%, #E0F7FA 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              AudioJunglee
            </Typography>
          </Box>

          <Divider sx={{
            bgcolor: alpha('#ffffff', 0.15),
            mx: 2,
            mb: 1
          }} />

          <List sx={{ px: 1.5, pt: 1 }}>
            {isAuthenticated && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                mx: 1.5,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#ffffff', 0.1),
              }}>
                {user?.avatar ? (
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  />
                ) : (
                  <Avatar sx={{
                    width: 40,
                    height: 40,
                    bgcolor: alpha('#ffffff', 0.2),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                    <AccountCircle />
                  </Avatar>
                )}
                <Box sx={{ ml: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {user.username || 'User'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
                    {user.role || 'Customer'}
                  </Typography>
                </Box>
              </Box>
            )}

            <ListItem
              button
              component={RouterLink}
              to="/"
              sx={{
                borderRadius: 2,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.15),
                  transform: 'translateX(4px)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem
              button
              component={RouterLink}
              to="/cart"
              sx={{
                borderRadius: 2,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.15),
                  transform: 'translateX(4px)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <Badge badgeContent={items.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>

            {isAuthenticated ? (
              <>
                <ListItem
                  button
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.15),
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>

                {user?.role === 'admin' && (
                  <ListItem
                    button
                    component={RouterLink}
                    to="/admin"
                    sx={{
                      borderRadius: 2,
                      my: 0.5,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha('#ffffff', 0.15),
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </ListItem>
                )}

                <Divider sx={{
                  bgcolor: alpha('#ffffff', 0.15),
                  my: 1.5,
                  mx: 1
                }} />

                <ListItem
                  button
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.15),
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}></ListItemIcon>
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.15),
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>

                <ListItem
                  button
                  component={RouterLink}
                  to="/register"
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    bgcolor: alpha('#ffffff', 0.15),
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.2),
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}

            <Divider sx={{
              bgcolor: alpha('#ffffff', 0.15),
              my: 1.5,
              mx: 1
            }} />

            <ListItem
              button
              onClick={toggleColorMode}
              sx={{
                borderRadius: 2,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.15),
                  transform: 'translateX(4px)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </ListItemIcon>
              <ListItemText primary={`${mode === 'light' ? 'Dark' : 'Light'} Mode`} />
            </ListItem>
          </List>

          <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} AudioJunglee
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;