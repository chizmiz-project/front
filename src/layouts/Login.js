import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';
import ApiService from '../services/api';
import AppLayout from './AppLayout';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let data = {
            'username': formData.username,
            'password': formData.password
        }

        const response = await ApiService.post('/account/login/', data);
        if (response.isSuccess) {
            navigate('/verify-otp', {
                state: {
                    username: formData.username,
                    password: formData.password
                }
            })
        } else {
            alert('login failed')
        }
    };

    return (
        <AppLayout variant='simple' title='ورود'>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="نام کاربری"
                    variant="outlined"
                    margin="normal"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />

                <TextField
                    fullWidth
                    label="رمز عبور"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    ورود
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                        حساب کاربری ندارید؟{' '}
                        <Link to="/signup" style={{ color: 'primary.main', textDecoration: 'none' }}>
                            ثبت‌نام کنید
                        </Link>
                    </Typography>
                </Box>
            </form>
        </AppLayout>
    );
}
