import React from 'react';
import { Search, MoreVert, ChevronLeft, Add } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Box, TextField, Typography, InputAdornment, Container, Button, Menu, useMediaQuery, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { CustomListGroup } from './list/CustomListGroup';
import { CustomListItem } from './list/CustomListItem';
import { useTheme } from '@emotion/react';
import { useCustomTheme } from '../context/ThemeContext';
import { primaryColor } from '../context/Configs';

export function AppBar({ variant = "title", title, hasNavigate = true, onSearchChange }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const isLoggedIn = !!user;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleTheme } = useCustomTheme();

  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (isSmallScreen)
      navigate('/settings')
    else
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
        InputProps={{
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
    <IconButton sx={{ color: primaryColor, opacity: 1, marginLeft: 'auto' }} onClick={() => navigate(-1)}>
      <ChevronLeft />
    </IconButton>
  ) : null;

  const desktopPlugins = variant !== 'title' ?
    <Box alignItems={'center'} gap={2} sx={{ display: { md: 'flex', sm: 'none', xs: 'none' } }}>
      {
        isLoggedIn ?
          <>
            <Typography variant='nav' onClick={() => navigate('/my-ads')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
              آگهی‌های من
            </Typography>
            <Typography variant='nav' onClick={() => navigate('/favorite-ads')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
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

  const mobileAddButton = (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        transform: 'scale(1.1)',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
      }}
      onClick={() => isLoggedIn ? navigate('/add') : navigate('/login')}
    >
      <Add />
    </Fab>
  );

  return (
    <>
      <MuiAppBar position="sticky" elevation={0}>
        <Toolbar sx={{ paddingY: { xs: 1}}}>
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
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.paper,
              elevation: 0,
              width: '300px',
              overflow: 'visible',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 13,
                height: 13,
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'var(--paper-overlay)',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 1000,
              },
            },
          }}
          MenuListProps={{ sx: { 
            py: 0, 
          } }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <CustomListGroup hasPadding>
            <CustomListItem
              type="navigation"
              label="آگهی‌های ذخیره‌شده"
              to="/favorite-ads"
              disabled={!isLoggedIn}
            />
            <CustomListItem
              type="navigation"
              label="آگهی‌های من"
              to="/my-ads"
              disabled={!isLoggedIn}
            />
            <CustomListItem
              type="navigation"
              label="بازدیدهای اخیر"
              to="/recent-views"
              disabled={!isLoggedIn}
            />
            <CustomListItem
              type="switch"
              label="حالت شب"
              checked={mode === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </CustomListGroup>
        </Menu>
      </MuiAppBar>
      {isSmallScreen && mobileAddButton}
    </>
  );
}
