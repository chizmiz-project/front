import React from "react";
import { Box, Typography, List, Divider } from '@mui/material';

export function SettingsGroup({ title, children }) {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" sx={{ px: 2, mb: 1 }}>
        {title}
      </Typography>
      <List>
        {React.Children.map(children, (child, index) => (
          <>
            {index > 0 && <Divider />}
            {child}
          </>
        ))}
      </List>
    </Box>
  );
}

