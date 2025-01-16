import { Search, MoreVert, ChevronLeft } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Box, TextField, Typography, InputAdornment, Container, Button, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { CustomListGroup } from './list/CutomListGroup';
import { CutomListItem } from './list/CutomListItem';
import { UserAccountSection } from './list/UserAccountSection';

export function AppBar({ variant = "title", title, hasNavigate = true, onSearchChange }) {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();
  const isLoggedIn = !!user;
  const [darkMode, setDarkMode] = useState(false);  

  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setting = variant === 'search' ? (
    <IconButton onClick={handleClick}>
      <MoreVert />
    </IconButton>
  ) : null;

  const searchInput = variant === 'title' ? null :
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        placeholder="جستجو کنید"
        fullWidth
        onChange={handleSearchChange}
        slotProps={{
          input: {
            sx: {
              maxHeight: '45px',
              maxWidth: {
                md: '500px'
              }
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }} />
    </Box>;

  const header = variant === 'title' ?
    <Box sx={{
      position: 'absolute',
      right: '50%',
      transform: 'translateX(50%)'
    }}>
      <Typography variant="h1" component="h1">
        {title}
      </Typography>
    </Box>

    : null;

  const navigation = hasNavigate ? (
    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => navigate(-1)}>
      <ChevronLeft />
    </IconButton>
  ) : null;

  const desktopPlugins = variant !== 'title' ?
    <Box alignItems={'center'} gap={2} sx={{ display: { md: 'flex', sm: 'none', xs: 'none' } }}>
      {
        isLoggedIn ?
          <>
            <Typography variant='body2' onClick={() => navigate('/my-ads')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
              آگهی‌های من
            </Typography>
            <Typography variant='body2' onClick={() => navigate('/favorite-ads')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
              ذخیره‌شده‌ها
            </Typography>
            <Button variant='contained' onClick={() => navigate('/add')}>
              ثبت آگهی
            </Button>
          </>
          :
          <>
          <Button variant='contained' onClick={() => navigate('/login')}>
            ورود
          </Button>
          <Button variant='outlined' onClick={() => navigate('/signup')}>
            ثبت‌نام
          </Button>
          </>
          
      }
    </Box> : null;

  return (
    <MuiAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ paddingY: { xs: .5}}}>
        <Container sx={{ gap: 1, py: .5, display: 'flex', alignItems: 'center', flexDirection: 'row', p: 0 }}>
          {setting}
          {searchInput}
          {header}
          {desktopPlugins}
          {navigation}
        </Container>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      slotProps={{
          paper: {
            sx: {
              width: '280px',
              overflow: 'visible',
              // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        
      <UserAccountSection
        isLoggedIn={!!user}
        userData={user}
        onLogin={() => { }}
        onLogout={logoutUser}
      />

      <CustomListGroup>
        <CutomListItem
          type="navigation"
          label="آگهی‌های ذخیره‌شده"
          to="/saved-ads"
        />
        <CutomListItem
          type="navigation"
          label="آگهی‌های من"
          to="/my-ads"
        />
        <CutomListItem
          type="navigation"
          label="بازدیدهای اخیر"
          to="/recent-views"
        />
        <CutomListItem
          type="switch"
          label="حالت شب"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </CustomListGroup>

      </Menu>
    </MuiAppBar>
  );
}
