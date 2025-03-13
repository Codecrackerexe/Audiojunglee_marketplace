import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import { Box, Container, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Footer from './Footer';

export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
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
        palette: {
          mode,
          primary: {
            main: '#2196f3',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            default: mode === 'light' ? '#f8f9fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: mode === 'light' 
                  ? 'linear-gradient(90deg, #2196f3 0%, #21CBF3 100%)' 
                  : 'linear-gradient(90deg, #0d47a1 0%, #1565c0 100%)',
                boxShadow: mode === 'light' 
                  ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 2px 12px rgba(0,0,0,0.05)' 
                  : '0 2px 12px rgba(0,0,0,0.2)',
              },
            },
          },
        },
        shape: {
          borderRadius: 8,
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
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: isMobile ? 'none' : theme.shadows[1],
                bgcolor: 'background.paper',
                p: { xs: 0, sm: 3 },
              }}
            >
              {children}
            </Box>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);

export default Layout;