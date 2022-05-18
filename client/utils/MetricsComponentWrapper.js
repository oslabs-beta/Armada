import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function MetricsComponentWrapper({ title, children }) {
  return (
    <Paper
      variant='outlined'
      sx={{ p: 2, width: '100%', height: '100%', mt: 5, mb: 5 }}
    >
      <Typography variant='body2' color='text.secondary'>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default MetricsComponentWrapper;
