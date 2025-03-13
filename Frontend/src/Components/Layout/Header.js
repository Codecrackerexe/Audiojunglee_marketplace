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
} from '@mui/icons-material';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create(['width', 'background-color']),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.6),
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const StyledAppBar = styled(AppBar)(({theme}) => ({
  background: 'linear-gradient(90deg, #2196f3 0%, #21CBF3 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const NavButton = styled(Button)(({theme}) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(0.8, 2),
  marginLeft: theme.spacing(1),
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}));

const LogoText = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  letterSpacing: 0.5,
  background: 'linear-gradient(45deg, #FFFFFF 30%, #E0F7FA 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginLeft: theme.spacing(1),
}));

const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#f50057',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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
    <Box sx={{flexGrow: 1}}>
      <HideOnScroll>
        <StyledAppBar position='fixed'>
          <Container maxWidth="lg">
            <Toolbar sx={{ padding: { xs: '8px 0', sm: '8px 0' } }}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer(true)}
                sx={{
                  mr: 2, 
                  display: {xs: 'flex', md: 'none'},
                  color: 'white',
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MusicIcon fontSize="large" sx={{ color: 'white' }} />
                <LogoText
                  variant='h5'
                  noWrap
                  component={RouterLink}
                  to="/"
                  sx={{
                    display: {xs: 'none', sm: 'block'},
                    textDecoration: 'none',
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
                  inputProps={{'aria-label': 'search'}}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </Search>
              
              <Box sx={{flexGrow: 1}}/>
              
              <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>
                <NavButton 
                  color="inherit" 
                  component={RouterLink} 
                  to="/"
                  startIcon={<HomeIcon />}
                >
                  Home
                </NavButton>
                <IconButton
                  size='large'
                  color='inherit'
                  component={RouterLink}
                  to="/cart"
                  sx={{
                    mx: 1,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
            <StyledBadge badgeContent={items.length} color='secondary'>
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
          
          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ 
                  ml: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
              >
                {user?.avatar ? (
                  <Avatar 
                    src={user.avatar} 
                    alt={user.username}
                    sx={{ width: 32, height: 32, border: '2px solid white' }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
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
                    borderRadius: 2,
                    minWidth: 180,
                    mt: 0.5,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      mx: 0.5,
                      my: 0.2,
                    },
                  }
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                  <ListItemIcon>
                    <ProfileIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                {user?.role === 'admin' && (
                  <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Admin Dashboard
                  </MenuItem>
                )}
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavButton color='inherit' component={RouterLink} to="/login">
                Login
              </NavButton>
              <NavButton 
                component={RouterLink} 
                to="/register"
                variant="contained"
                sx={{ 
                  bgcolor: 'white', 
                  color: '#2196f3',
                  '&:hover': {
                    bgcolor: alpha('#ffffff', 0.9),
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
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
        </Box>
      </Toolbar>
    </Container>
  </StyledAppBar>
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
      background: 'linear-gradient(180deg, #2196f3 0%, #21CBF3 100%)',
      color: 'white',
    }
  }}
>
  <Box
    sx={{ width: '100%' }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 3 }}>
      <MusicIcon fontSize="large" />
      <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
        AudioJunglee
      </Typography>
    </Box>
    
    <Divider sx={{ bgcolor: alpha('#ffffff', 0.1) }} />
    
    <List sx={{ px: 1 }}>
      <ListItem 
        button 
        component={RouterLink} 
        to="/"
        sx={{ borderRadius: 2, my: 0.5 }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem 
        button 
        component={RouterLink} 
        to="/cart"
        sx={{ borderRadius: 2, my: 0.5 }}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText 
          primary="Cart" 
          secondary={items.length > 0 ? `${items.length} items` : "Empty"} 
          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
        />
      </ListItem>
    </List>
    
    <Divider sx={{ my: 1, bgcolor: alpha('#ffffff', 0.1) }} />
    
    <List sx={{ px: 1 }}>
      {isAuthenticated ? (
        <>
          <ListItem sx={{ px: 2, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {user?.avatar ? (
                <Avatar src={user.avatar} alt={user.username} sx={{ width: 40, height: 40 }} />
              ) : (
                <AccountCircle sx={{ width: 40, height: 40 }} />
              )}
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.username || 'User'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {user.email || ''}
                </Typography>
              </Box>
            </Box>
          </ListItem>
          
          <ListItem 
            button 
            component={RouterLink} 
            to="/profile"
            sx={{ borderRadius: 2, my: 0.5 }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          
          {user?.role === 'admin' && (
            <ListItem 
              button 
              component={RouterLink} 
              to="/admin"
              sx={{ borderRadius: 2, my: 0.5 }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </ListItem>
                )}
                
                <ListItem 
                  button 
                  onClick={handleLogout}
                  sx={{ borderRadius: 2, my: 0.5 }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
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
                  sx={{ borderRadius: 2, my: 0.5 }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
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
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.25),
                    }
                  }}
                >
                  <ListItemText 
                    primary="Register" 
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
              </>
            )}
          </List>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ p: 2, textAlign: 'center', mt: 4 }}>
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