import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Typography, Box, IconButton, Paper } from '@mui/material';
import ApiService from '../../services/api';
import { useUser } from '../../context/UserContext';
import { toPersianDigits } from '../../services/Utils';

export function UserAccountSection({ isLoggedIn, userData, onLogout }) {
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  console.log(userData)

  const handleLogoutClick = async () => {
    try {
      await ApiService.post('/account/logout/');
      clearUser();
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
    <Paper sx={{ p: 2 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1
      }}>
        <Box>
          <Typography variant="h1">{`${userData?.first_name} ${userData?.last_name}`}</Typography>
          <Typography variant='subtitle1'>{toPersianDigits(userData?.phone_number)}</Typography>
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
    </Paper>
  );
}
