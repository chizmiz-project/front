import { Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function CategoryItem({ category }) {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ p: 2, textAlign: 'center' }}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <Typography variant="body2">{category.title}</Typography>
    </Paper>
  );
}

