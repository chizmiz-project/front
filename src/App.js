import './App.css';
import { createTheme } from '@mui/material/styles';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import MainLayout from './layouts/MainLayout';
import GridLayout from './layouts/GridLayout';

const theme = createTheme({
  direction: 'rtl',
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
