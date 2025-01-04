import { Search, ArrowBack, MoreVert } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Box, TextField, Typography, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function AppBar({ variant = "title", title, hasNavigate = true, onSearchChange }) {
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value);
  }

  const setting = variant === 'search' ? (
    <IconButton edge="start" onClick={() => navigate('/settings')}>
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
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
    </Box>

    : null;

  const navigation = hasNavigate ? (
    <IconButton edge="end" onClick={() => navigate(-1)}>
      <ArrowBack />
    </IconButton>
  ) : null;

  return (
    <MuiAppBar position="sticky" color="default" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        {setting}
        {searchInput}
        {header}
        {navigation}
      </Toolbar>
    </MuiAppBar>
  );
}