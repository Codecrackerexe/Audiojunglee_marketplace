import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import { Box, Container, useMediaQuery, Paper, Fade } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Footer from './Footer';

export const ColorModeContext = createContext({
  toggleColorMode: () => { },
  mode: 'light'
});

const Layout = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || (prefersDarkMode ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
          },
          h2: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
          },
          h3: {
            fontWeight: 600,
          },
          button: {
            fontWeight: 600,
            textTransform: 'none',
          },
        },
        palette: {
          mode,
          primary: {
            main: '#3a86ff',
            light: '#60a5fa',
            dark: '#1e40af',
          },
          secondary: {
            main: '#f72585',
            light: '#fb7185',
            dark: '#be185d',
          },
          background: {
            default: mode === 'light' ? '#f9fafb' : '#111827',
            paper: mode === 'light' ? '#ffffff' : '#1f2937',
          },
          text: {
            primary: mode === 'light' ? '#1f2937' : '#f3f4f6',
            secondary: mode === 'light' ? '#4b5563' : '#9ca3af',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: mode === 'light'
                  ? 'linear-gradient(135deg, #3a86ff 0%, #4f46e5 100%)'
                  : 'linear-gradient(135deg, #1e40af 0%, #4338ca 100%)',
                boxShadow: mode === 'light'
                  ? '0 4px 20px rgba(79, 70, 229, 0.15)'
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light'
                  ? '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)'
                  : '0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'light'
                    ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
                    : '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.2s',
                fontWeight: 600,
              },
              contained: {
                boxShadow: mode === 'light'
                  ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                  : '0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.12)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode],
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
            position: 'relative',
            backgroundImage: mode === 'light'
              ? 'radial-gradient(at 100% 0%, rgba(58, 134, 255, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(247, 37, 133, 0.1) 0px, transparent 50%)'
              : 'radial-gradient(at 100% 0%, rgba(30, 64, 175, 0.2) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(190, 24, 93, 0.2) 0px, transparent 50%)',
          }}
        >
          <Header />
          <Container
            component="main"
            sx={{
              flexGrow: 1,
              py: { xs: 3, md: 5 },
              px: { xs: 2, sm: 3, md: 4 },
              maxWidth: { xl: '1400px' },
              width: '100%',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <Fade in={true} timeout={800}>
              <Paper
                elevation={isMobile ? 0 : 2}
                sx={{
                  borderRadius: { xs: 2, sm: 3 },
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  p: { xs: 2, sm: 3, md: 4 },
                  backdropFilter: 'blur(20px)',
                  backgroundColor: mode === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(31, 41, 55, 0.9)',
                  border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: mode === 'light'
                    ? '0 10px 40px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.02)'
                    : '0 10px 40px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    backgroundImage: mode === 'light'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                    borderRadius: 'inherit',
                  }
                }}              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {children}
                </Box>
              </Paper>
            </Fade>
          </Container>
          <Footer />

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'fixed',
              top: '10%',
              right: '5%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: mode === 'light'
                ? 'radial-gradient(circle, rgba(58,134,255,0.08) 0%, rgba(79,70,229,0) 70%)'
                : 'radial-gradient(circle, rgba(30,64,175,0.15) 0%, rgba(67,56,202,0) 70%)',
              zIndex: 0,
              filter: 'blur(40px)',
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: 'fixed',
              bottom: '15%',
              left: '10%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: mode === 'light'
                ? 'radial-gradient(circle, rgba(247,37,133,0.08) 0%, rgba(253,186,116,0) 70%)'
                : 'radial-gradient(circle, rgba(190,24,93,0.15) 0%, rgba(253,186,116,0) 70%)',
              zIndex: 0,
              filter: 'blur(40px)',
              opacity: 0.7,
            }}
          />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);

export default Layout;