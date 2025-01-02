import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Typography, Box, IconButton } from '@mui/material';

export function UserAccountSection({ isLoggedIn, userData, onLogout, onLogin }) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>حساب من</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          فاقد حساب کاربری هستید. لطفا وارد شوید.
        </Typography>
        <Button 
          onClick={onLogin} 
          variant="outlined" 
          fullWidth
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
          <Typography variant="subtitle1">{userData?.name}</Typography>
          <Typography color="text.secondary">{userData?.phone}</Typography>
        </Box>
        <IconButton onClick={() => navigate('/account/edit')}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Button 
        onClick={onLogout} 
        variant="outlined" 
        fullWidth
      >
        خروج از حساب کاربری
      </Button>
    </Box>
  );
}

