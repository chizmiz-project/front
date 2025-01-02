import { Search, ArrowBack, MoreVert } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar, Box, TextField, Typography, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function AppBar({ variant = "main", title }) {
  const navigate = useNavigate();

  return (
    <MuiAppBar position="sticky" color="default" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
      {variant === 'main' || variant === 'category' ? (
          <IconButton edge="start" onClick={() => navigate('/settings')}>
            <MoreVert />
          </IconButton>
        ) : null}

        {variant === 'simple' ? null :
          <Box sx={{ position: 'relative', width: '100%'}}>
            <TextField
              placeholder="جستجو کنید"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
            </Box>
        }
{variant === 'simple' ?
          <Box sx={{
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)'
          }}>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          </Box>

          : null
        }

{variant === 'category' || variant === 'simple' ? (
          <IconButton edge="end" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        ) : null}

      </Toolbar>
    </MuiAppBar>
  );
}