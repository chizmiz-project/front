import { Search, MoreVert, ChevronLeft } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Box, TextField, Typography, InputAdornment, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function AppBar({ variant = "title", title, hasNavigate = true, onSearchChange }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const isLoggedIn = !!user;

  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value);
  }

  const setting = variant === 'search' ? (
    <IconButton onClick={() => navigate('/settings')}>
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
            <Typography variant='body2' onClick={() => navigate('/temp')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
              آگهی‌های من
            </Typography>
            <Typography variant='body2' onClick={() => navigate('/temp')} sx={{ minWidth: 'fit-content', textWrap: 'nowrap' }}>
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
    </MuiAppBar>
  );
}
