import './App.css';
import { createTheme } from '@mui/material/styles';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import MainLayout from './layouts/MainLayout';
import GridLayout from './layouts/GridLayout';
import { blueGrey } from '@mui/material/colors';

const borderColor = blueGrey[50]
const border = `1px solid ${borderColor}`
const borderRadius = '0.5rem'
const large_borderRadius = '0.8rem'

const theme = createTheme({
  typography: {
    fontFamily: 'Vazirmatn',
    h3: {
      fontSize: '1rem',
      fontWeight: 500
    }
  },
  direction: 'rtl',
  shape: {
    borderRadius: borderRadius
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderBottom: border
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: border,
          borderRadius: large_borderRadius,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '.5rem'
        }
      }
    }
  }
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <GridLayout></GridLayout>
        </MainLayout>
    </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
