import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';
import { useUser } from '../../context/UserContext';

export default function VerifyOTPPage() {
  const { state } = useLocation();
  const { updateUser } = useUser();

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let data = {
      "username": state.username,
      "otp": otp
    };

    try {
      const response = await ApiService.post('/account/verify-otp/', data);
      console.log(response);
      if (response.isNotFound || response.isBadRequest)
        setError('کد وارد شده صحیح نیست');
      else {
        const response2 = await ApiService.get('/account/me/');
        console.log(response2.data)
        updateUser({
          username: state.username,
          phone_number: response.data.phone_number,
        });

        navigate('/');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'ورود'
          )}
        </Button>

        <Button
          fullWidth
          variant="text"
          size='large'
          onClick={handleCancel}
          sx={{ mt: 1 }}
        >
          انصراف
        </Button>
      </form>
    </AppLayout>
  );
}
