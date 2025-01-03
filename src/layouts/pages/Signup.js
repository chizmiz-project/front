import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';

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
  const [showPassword, setShowPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      setLoading(false);
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
    };
  
    try {
      const response = await ApiService.post('/account/signup/', data);
  
      if (response.isBadRequest) {
        let errorMessages = '';
        for (let key in response.data) {
          const fieldErrors = response.data[key];
          fieldErrors.forEach((error) => {
            errorMessages += `${error} `;
          });
        }
        setError(errorMessages);
      }
  
      if (response.isSuccess) {
        let loginData = {
          'username': formData.username,
          'password': formData.password
        };
  
        const loginResponse = await ApiService.post('/account/login/', loginData);

        navigate('/verify-otp', {
          state: {
            username: formData.username,
            password: formData.password
          }
        });
        console.log(loginResponse);
      }
  
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AppLayout title='ثبت‌نام'>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="نام کاربری"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />

        <TextField
          fullWidth
          label="ایمیل"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="شماره تلفن"
          variant="outlined"
          margin="normal"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
        />

        <TextField
          fullWidth
          label="آدرس"
          variant="outlined"
          margin="normal"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <TextField
          fullWidth
          label="بیوگرافی"
          variant="outlined"
          margin="normal"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />

        <TextField
          fullWidth
          label="رمز عبور"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="تکرار رمز عبور"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
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
            'ثبت‌نام'
          )}
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
