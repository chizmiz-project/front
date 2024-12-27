import { ArrowBack } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function AppBar({ title }) {
  const navigate = useNavigate();

  return (
    <MuiAppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="back"
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="h1" style={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)'
        }}>
          {title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

