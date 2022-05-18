import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function MetricsComponentWrapper({ title, children }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 4,
        width: '100%',
        height: '100%',
        mt: 5,
        mb: 5,
      }}
    >
      {children}
    </Paper>
  );
}

export default MetricsComponentWrapper;
