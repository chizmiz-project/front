import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import ApiService from '../../services/Api';
import AppLayout from '../AppLayout';
import { useUser } from '../../context/UserContext';
import { useSnackbar } from '../../context/SnackbarProvider';

export default function VerifyOTPPage() {
  const { state } = useLocation();
  const { updateUser } = useUser();

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {openSnackbar} = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    let data = {
      "username": state.username,
      "otp": otp
    };

    try {
      const response = await ApiService.post('/account/verify-otp/', data);

      if (response.isSuccess) {
        console.log(response.data);
        updateUser({
          username: state.username,
          phone_number: response.data.phone_number,
          first_name: response.data.first_name,
          last_name: response.data.last_name
        });
        openSnackbar(response.data.message, 'success')
        navigate('/');
      } else {
        setError(true)
        openSnackbar('کد وارد شده معتبر نیست.', 'error');
        setOtp('');
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="کد ورود"
          variant="outlined"
          error={error}
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setError('');
          }}
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
          size='large'
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
