import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container
} from '@mui/material';
import ApiService, { fetchData } from '../services/api';
import AppLayout from './AppLayout';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    bio: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    let data = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
      "account": {
        "phone_number": formData.phone_number,
        "bio": formData.bio,
        "address": formData.address
      }
    }

    const response = await ApiService.post('/account/signup/', data)

    if (response.isBadRequest)
      setError("داده‌های ارسالی معتبر نیست: " + response.data)

    if (response.isSuccess)
      data = {
        'username': formData.username,
        'password': formData.password
      }
    const loginResponse = await ApiService.post('/account/login/', data)
    alert('sucess signup -> login')
    navigate('/verify-otp', {
      state: {
        username: formData.username,
        password: formData.password
      }
    })
    console.log(response)
  };

  return (
    <AppLayout variant='simple' title='ثبت‌نام'>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="نام کاربری"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        // required
        />

        <TextField
          fullWidth
          label="ایمیل"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        // required
        />

        <TextField
          fullWidth
          label="شماره تلفن"
          variant="outlined"
          margin="normal"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
        // required
        />

        <TextField
          fullWidth
          label="رمز عبور"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        // required
        />

        <TextField
          fullWidth
          label="تکرار رمز عبور"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        // required
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
        >
          ثبت‌نام
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            حساب کاربری دارید؟{' '}
            <Link to="/login" style={{ color: 'primary.main', textDecoration: 'none' }}>
              وارد شوید
            </Link>
          </Typography>
        </Box>
      </form>
    </AppLayout>
  );
}