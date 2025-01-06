import { SearchOff } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

export default function EmptyState({ message = "موردی یافت نشد ..." }) {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'50vh'}
      flexDirection={'column'}
    >
      <IconButton>
        <SearchOff sx={{ fontSize: '7rem' }} />
      </IconButton>
      <Typography variant='h6'>
        {message}
      </Typography>
    </Box>
  );
}

