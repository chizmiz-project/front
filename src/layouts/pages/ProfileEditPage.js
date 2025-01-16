import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import ApiService from '../../services/Api';
import AppLayout from '../AppLayout';

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    bio: '',
    address: ''
  });
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    account: {
      phone_number: '',
      bio: '',
      address: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await ApiService.get('/account/me/');
        if (response.isSuccess) {
          const data = response.data;
          setUserDetails(data);
          setFormData({
            bio: data.account.bio || '',
            address: data.account.address || ''
          });
        } else if (response.isError) {
          setError('Failed to fetch user details.');
        }
      } catch (error) {
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = {
      bio: formData.bio,
      address: formData.address
    };

    try {
      const response = await ApiService.put('/account/update/', data);
      if (response.isSuccess) {
        alert('Profile updated successfully');
      } else if (response.isBadRequest) {
        let errorMessages = '';
        for (let key in response.data) {
          errorMessages += response.data[key] + ' ';
        }
        setError(errorMessages.trim());
      }
    } catch (error) {
      setError('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="حساب کاربری">
      <form onSubmit={handleSubmit}>
        <Typography variant="body">نام</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />

        <Typography variant="body">نام خانوادگی</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />

        <Typography variant="body">نام کاربری</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />

        <Typography variant="body">آدرس ایمیل</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Typography variant="body">شماره موبایل</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.account.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
        />

        <Typography variant="body">بیوگرافی</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />

        <Typography variant="body">آدرس</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'ویرایش'}
        </Button>
      </form>
    </AppLayout>
  );
}
