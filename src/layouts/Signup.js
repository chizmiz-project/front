import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container
} from '@mui/material';
import { fetchData } from '../services/api';
import { AppBar } from '../components/AppBar';

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
    
    const data = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password
    }
    try {
      const responseData = await fetchData('http://localhost:8000/api/account/signup/', 'POST', data);
      console.log(responseData)
      navigate('/verify-otp')      
    } catch (error) {
    }    

  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar variant="main" />

      <Container sx={{ py: 2 }}>
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
      </Container>
    </Box>
  );
}