import React from "react";
import { Box, List, Divider, Paper } from '@mui/material';

export function CustomListGroup({ children }) {
  const childrenArray = React.Children.toArray(children);

  return (
    <Box>
      <List sx={{ backgroundColor: 'background.paper'}} component={Paper}>
        {childrenArray.map((child, index) => (
          <>
            {index > 0 && <Divider/>}
            {child}
          </>
        ))}
      </List>
    </Box>
  );
}