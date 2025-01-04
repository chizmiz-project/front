import React from "react";
import { Box, Typography, List, Divider, Paper } from '@mui/material';
import { labelColor } from "../../theme";

export function SettingsGroup({ title, children }) {
  return (
    <Box my={2}>
      <Typography display='none' px={2} component={'h3'} mb={1} color={labelColor} variant="body2" >
        {title}
      </Typography>
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

