import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';

export default function VerifyOTPPage() {
  const { state } = useLocation();
  console.log(state)

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let data = {
      "username": state.username,
      "otp": otp
    }
    const response = await ApiService.post('/account/verify-otp/', data)
    console.log(response)
    if (response.isNotFound || response.isBadRequest)
      setError('کد وارد شده صحیح نیست');
    else {
      navigate('/')
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <AppLayout title='اعتبار‌سنجی'>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="body1">
          کد ورود را وارد کنید
        </Typography>
        <Typography variant="body2" color="text.secondary">
          کد ارسال‌شده به ایمیلتان را وارد کنید
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="کد ورود"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          ورود
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={handleCancel}
          sx={{ mt: 1 }}
        >
          انصراف
        </Button>
      </form>
    </AppLayout>
  );
}