import logo from './logo.svg';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { TextField } from '@mui/material';

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
      <TextField
        label="ملصق"
        placeholder="العنصر النائب"
        helperText="هذا نص مساعد"
        variant="outlined"
      />
    </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
