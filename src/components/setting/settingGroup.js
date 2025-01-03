import React from "react";
import { Box, Typography, List, Divider, Paper } from '@mui/material';

export function SettingsGroup({ title, children }) {
  return (
    <Box my={2}>
      <Typography display={'none'} mb={1} variant="caption" >
        {title}
      </Typography>
      <List component={Paper} elevation={false}>
        {children.map((child, index) => (
          <>
            {index > 0 && <Divider  />}
            {child}
          </>
        ))}
      </List>
    </Box>
  );
}

