import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Typography, Box, IconButton, Paper } from '@mui/material';
import ApiService from '../../services/api';
import { useUser } from '../../context/UserContext';

export function UserAccountSection({ isLoggedIn, userData, onLogout }) {
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    try {
      await ApiService.post('/account/logout');
      clearUser();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isLoggedIn) {
    return (
        <Button 
          onClick={handleLoginClick} 
          variant="contained" 
          fullWidth
          size="large"
        >
          ورود به حساب کاربری
        </Button>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography display='none' variant="h6" gutterBottom>حساب من</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Box>
          <Typography variant="subtitle1">{userData?.username}</Typography>
          <Typography color="text.secondary">{userData?.phone_number}</Typography>
        </Box>
        <IconButton onClick={() => navigate('/profile/edit')}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Button 
        onClick={handleLogoutClick}
        variant="outlined" 
        size="large"
        fullWidth
        color='error'
      >
        خروج از حساب کاربری
      </Button>
    </Box>
  );
}
