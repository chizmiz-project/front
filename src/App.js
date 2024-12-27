import './App.css';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SettingsPage from './layouts/settingPage'
import Theme from './theme.js'
import MainPage from './layouts/MainPage.js';
import CategoryPage from './layouts/CategoryMainPage.js';
import AdDetailsPage from './layouts/AdDetailsPage.js';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/ad/details" element={<AdDetailsPage />} />
            <Route path="/category/" element={<CategoryPage />} />
            <Route path="/" element={<MainPage/>} />
            {/* <Route path="/recent-views" element={<RecentViews />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
