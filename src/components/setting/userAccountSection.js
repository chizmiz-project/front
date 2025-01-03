import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Typography, Box, IconButton } from '@mui/material';
import ApiService from '../../services/api';
import { useUser } from '../../context/UserContext';

export function UserAccountSection({ isLoggedIn, userData, onLogout }) {
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signup');
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
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>حساب من</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          فاقد حساب کاربری هستید. لطفا وارد شوید.
        </Typography>
        <Button 
          onClick={handleLoginClick} 
          variant="outlined" 
          fullWidth
          size="large"
        >
          ورود به حساب کاربری
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>حساب من</Typography>
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
        <IconButton onClick={() => navigate('/account/edit')}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Button 
        onClick={handleLogoutClick}
        variant="outlined" 
        size="large"
        fullWidth
      >
        خروج از حساب کاربری
      </Button>
    </Box>
  );
}
