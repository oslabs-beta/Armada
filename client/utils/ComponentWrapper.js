import React from 'react';
import { Paper, Typography } from '@mui/material';

function ComponentWrapper({ title, children }) {
  return (
    <Paper variant='outlined' sx={{ p: 2, width: '100%', height: '100%' }}>
      <Typography variant='body2' color='text.secondary'>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default ComponentWrapper;
