import { Box, Paper, Typography } from '@mui/material';

function AdItem({ title, price, time, imageUrl }) {
  return (
    <Paper 
      elevation={0} 
      style={{ 
        padding: '16px',
        display: 'flex',
        gap: '16px',
        backgroundColor: 'white',
        borderRadius: '8px'
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '4px',
          objectFit: 'cover',
          backgroundColor: 'grey'
        }}
      />
      <Box style={{ flex: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" style={{ color: 'black' }}>
          {price} تومان
        </Typography>
        <Typography variant="body2" style={{ color: 'grey' }}>
          {time} ساعت پیش در صادقیه
        </Typography>
      </Box>
    </Paper>
  );
}

