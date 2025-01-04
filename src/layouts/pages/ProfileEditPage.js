import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: '',
    bio: '',
    address: ''
  });
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    account: {
      phone_number: '',
      bio: '',
      address: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserDetails(
      {
        first_name: 'ali',
        last_name: 'bonaftizadeh',
        username: 'sample user',
        email: 'sample email',
        password: '******',
        account: {
          phone_number: '0935774784',
          bio: 'a test bio',
          address: 'tehran hastim :)'
        }
      }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let data = {
      "bio": formData.bio,
      "address": formData.address
    }

    const response = await ApiService.post('/account/update/', data);

    if (response.isSuccess)
      alert('successfully updated');

    if (response.isBadRequest) {
      let errorMessages = '';
      for (let key in response.data) {
        const fieldError = response.data[key];
        errorMessages += fieldError;
      }
      setError(errorMessages);
    }

    setLoading(false);

  };

  return (
    <AppLayout title='حساب کاربری'>
      <form onSubmit={handleSubmit}>
        <Typography variant='body'>نام کاربری</Typography>
        <TextField

          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.username}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />

        <Typography variant='body'>نام</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          type="email"
          variant="outlined"
          margin="normal"
          value={userDetails.first_name}
        />

        <Typography variant='body'>نام خانوادگی</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.account.last_name}
        />

        <Typography variant='body'>آدرس ایمیل</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.email}
        />

        <Typography variant='body'>شماره موبایل</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.account.phone_number}
        />

        <Typography variant='body'>بیوگرافی</Typography>
        <TextField
          helperText='یه توضیح خوب از خودت می‌تونه به بهتر دیده شدنت کمک کنه :)'

          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.account.bio}
        />

        <Typography variant='body'>آدرس</Typography>
        <TextField
          sx={{ marginBottom: '1rem', marginTop: '0.5rem' }}

          disabled
          fullWidth
          variant="outlined"
          margin="normal"
          value={userDetails.account.address}
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'ویرایش'
          )}
        </Button>
      </form>
    </AppLayout>
  );
}
