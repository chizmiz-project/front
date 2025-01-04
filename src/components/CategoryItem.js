import { Box, Paper, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function CategoryItem({ category }) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(158, 158, 158, 0.1)',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <Home />
      <Typography variant="body2">{category.title}</Typography>
    </Paper>
  );
}

