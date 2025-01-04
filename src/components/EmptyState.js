import { Box, Typography } from '@mui/material';

export default function EmptyState({ message = "موردی یافت نشد ..." }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        color: 'text.secondary'
      }}
    >
      <Typography>
        {message}
      </Typography>
    </Box>
  );
}

