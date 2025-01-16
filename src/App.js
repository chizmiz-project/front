import './App.css';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './layouts/pages/MainPage.js';
import CategoryPage from './layouts/pages/CategoryMainPage.js';
import AdDetailsPage from './layouts/pages/AdDetailsPage.js';
import LoginPage from './layouts/pages/Login.js';
import SignupPage from './layouts/pages/Signup.js';
import VerifyOTPPage from './layouts/pages/Verify-otp.js';
import SettingsPage from './layouts/pages/SettingPage.js';
import ProfileEditPage from './layouts/pages/ProfileEditPage.js';
import MyAdsPage from './layouts/pages/MyAdsPage.js';
import FavoriteAdsPage from './layouts/pages/FavoriteAdsPage.js';
import CreateAdPage from './layouts/pages/CreateAdPage.js';
import { UserProvider } from './context/UserContext';
import { SnackbarProvider } from './context/SnackbarProvider.js';
import { ThemeProvider } from './context/ThemeContext.js';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <CacheProvider value={cacheRtl}>
          <SnackbarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/ad/details/:id" element={<AdDetailsPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-otp" element={<VerifyOTPPage />} />
                <Route path="/add" element={<CreateAdPage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route path="/my-ads" element={<MyAdsPage />} />
                <Route path="/favorite-ads" element={<FavoriteAdsPage />} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </CacheProvider>
      </ThemeProvider>
    </UserProvider >
  );
}

export default App;
