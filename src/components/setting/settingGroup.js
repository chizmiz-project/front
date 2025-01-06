import React from "react";
import { Box, List, Divider, Paper } from '@mui/material';

export function SettingsGroup({ children }) {
  return (
    <Box my={2}>
      <List component={Paper}>
        {children.map((child, index) => (
          <>
            {index > 0 && <Divider/>}
            {child}
          </>
        ))}
      </List>
    </Box>
  );
}

