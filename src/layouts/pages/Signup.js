import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ApiService from '../../services/Api';
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
    address: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [phoneErrorText, setPhoneErrorText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordErrorText('رمز عبور و تکرار آن تطابق نداند.')
      setLoading(false);
      return;
    }

    let data = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
      "first_name": formData.first_name,
      "last_name": formData.last_name,
      "account": {
        "phone_number": formData.phone_number,
        "bio": formData.bio,
        "address": formData.address
      }
    };

    try {
      const response = await ApiService.post('/account/signup/', data);
      
      console.log(response);

      if (response.isBadRequest) {
        for (let key in response.data) {
          if (key === 'password') 
            setPasswordErrorText(error[key].join("\r\n"));
          if (key === 'username')
            setUsernameErrorText(error[key].join("\r\n"));
          if (key === 'email')
            setEmailErrorText(error[key].join("\r\n"));
          if (key === 'account.phone_number')
            setPhoneErrorText(error[key].join("\r\n"));
        }
      }

      if (response.isSuccess) {
        let loginData = {
          'username': formData.username,
          'password': formData.password
        };

        await ApiService.post('/account/login/', loginData);

        navigate('/verify-otp', {
          state: {
            username: formData.username,
            password: formData.password
          }
        });
      }
    } catch (err) {
      setError('An unexpected error occurred.' + err.errorMessages);
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
          label="نام"
          variant="outlined"
          margin="normal"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required
        />

        <TextField
          fullWidth
          label="نام خانوادگی"
          variant="outlined"
          margin="normal"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />

        <TextField
          fullWidth
          required
          helperText={usernameErrorText}
          error={usernameErrorText !== ''}
          label="نام کاربری"
          margin="normal"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
            setUsernameErrorText('');
          }}
        />

        <TextField
          fullWidth
          required
          label="ایمیل"
          helperText={emailErrorText}
          error={emailErrorText !== ''}
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setEmailErrorText('');
          }}
        />

        <TextField
          fullWidth
          label="شماره تلفن"
          variant="outlined"
          helperText={phoneErrorText}
          error={phoneErrorText !== ''}
          margin="normal"
          value={formData.phone_number}
          onChange={(e) => {
            setFormData({ ...formData, phone_number: e.target.value })
            setPhoneErrorText('');
          }
          }
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
          required
          label="رمز عبور"
          type={showPassword ? 'text' : 'password'}
          helperText={passwordErrorText}
          error={passwordErrorText !== ''}
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
          required
          label="تکرار رمز عبور"
          helperText={confirmPasswordErrorText}
          error={confirmPasswordErrorText !== ''}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
          size='large'
        >
          {loading ? (
            <CircularProgress size={24} color="#FFFFFF" />
          ) : (
            'ثبت‌نام'
          )}
        </Button>

        <Box display={'flex'} justifyContent={'center'} gap={1}>
          <Typography variant="body1">
            حساب کاربری دارید؟
          </Typography>
          <Link href="/login" underline='none'>
            وارد شوید
          </Link>
        </Box>
      </form>
    </AppLayout>
  );
}
