import './App.css';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Theme from './theme.js'
import MainPage from './layouts/pages/MainPage.js';
import CategoryPage from './layouts/pages/CategoryMainPage.js';
import AdDetailsPage from './layouts/pages/AdDetailsPage.js';
import LoginPage from './layouts/pages/Login.js';
import SignupPage from './layouts/pages/Signup.js';
import VerifyOTPPage from './layouts/pages/verify-otp.js';
import SettingsPage from './layouts/pages/settingPage.js';
import ProfileEditPage from './layouts/pages/ProfileEditPage.js';
import CreateAdPage from './layouts/pages/CreateAdPage.js';
import { UserProvider } from './context/UserContext';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <UserProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={Theme}>
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
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
}

export default App;
