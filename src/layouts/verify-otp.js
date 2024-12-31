// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Box, Container } from '@mui/material';
// import { authService } from '../services/api';
// import { AppBar } from '../components/AppBar';

// export default function VerifyOTPPage() {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await authService.verifyOTP(otp);
//       navigate('/');  // Navigate to home after successful verification
//     } catch (err) {
//       setError('کد وارد شده صحیح نیست');
//     }
//   };

//   const handleCancel = () => {
//     navigate('/login');
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
//       <AppBar variant="main" />

//       <Container sx={{ py: 2 }}>
//       <Box sx={{ textAlign: 'center', mb: 3 }}>
//         <Typography variant="body1">
//           کد ورود را وارد کنید
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           کد ارسال‌شده به ایمیلتان را وارد کنید
//         </Typography>
//       </Box>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="کد ورود"
//           variant="outlined"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />

//         {error && (
//           <Typography color="error" sx={{ mt: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3 }}
//         >
//           ورود
//         </Button>

//         <Button
//           fullWidth
//           variant="text"
//           onClick={handleCancel}
//           sx={{ mt: 1 }}
//         >
//           انصراف
//         </Button>
//       </form>
//       </Container>
//     </Box>
//   );
// }