import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function MetricsComponentWrapper({ title, children }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        pt: 3,
        pl: 3,
        pr: 3,
        pb: 7,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Paper>
  );
}

export default MetricsComponentWrapper;
