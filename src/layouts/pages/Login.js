import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Link
} from '@mui/material';
import ApiService from '../../services/api';
import AppLayout from '../AppLayout';
import { useSnackbar } from '../../context/SnackbarProvider';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useSnackbar();

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
                openSnackbar('ایمیلی حاوی کد ورود برای شما ارسال شد', 'info')
                navigate('/verify-otp', {
                    state: {
                        username: formData.username,
                        password: formData.password,
                    },
                });
            } else {
                openSnackbar(response.data['error'], 'error');
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data?.error || 'خطایی رخ داده است. لطفا بعدا تلاش کنید.';
                setError(errorMessage);
            } else {
                setError('خطایی رخ داده است. لطفا بعدا تلاش کنید.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout title='ورود به حساب کاربری'>
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

                <Box mt={2} display={'flex'} gap={1.5} flexDirection={'column'} sx={{ textAlign: 'center' }}>
                    <Button
                        type="submit"
                        fullWidth
                        size='large'
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={25}
                                sx={{
                                    color: 'white',
                                }}
                            />
                        ) : (
                            'ورود'
                        )}
                    </Button>

                    <Box display={'flex'} justifyContent={'center'} gap={1}>
                        <Typography variant="body1">
                            حساب کاربری ندارید؟
                        </Typography>
                        <Link href="/signup" underline='none'>
                            ثبت‌نام کنید
                        </Link>
                    </Box>
                </Box>
            </form>
        </AppLayout>
    );
}
