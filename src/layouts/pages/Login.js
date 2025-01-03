import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress
} from '@mui/material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let data = {
            'username': formData.username,
            'password': formData.password
        };

        try {
            const response = await ApiService.post('/account/login/', data);
            if (response.isSuccess) {
                navigate('/verify-otp', {
                    state: {
                        username: formData.username,
                        password: formData.password
                      }
                    });
            } else {
                alert('login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout title='ورود'>
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
                    sx={{
                        mt: 3,
                        mb: 2,
                        position: 'relative',
                        minHeight: '48px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: 'white',
                            }}
                        />
                    ) : (
                        'ورود'
                    )}
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
