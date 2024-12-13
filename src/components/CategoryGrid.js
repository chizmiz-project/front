import React from 'react';
import { Button, Grid2 } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const CategoryGrid = () => {
  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      {Array.from(Array(11)).map((_, index) => (
        <Grid2 item xs={3} sm={2} md={1} key={index}>
          <Button
            variant="outlined"
            fullWidth
            size='small'
            style={{ flexDirection: 'column' }}
          >
            <HomeIcon fontSize="large"/>
            <span>املاک</span>
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CategoryGrid;
