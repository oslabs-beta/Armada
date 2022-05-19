import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Refresh = ({ handleRefresh, lastUpdated }) => {
  useEffect(() => {}, [handleRefresh, lastUpdated]);
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
    >
      <Typography
        className='timestamp'
        color='text.secondary'
        variant='caption'
      >
        Last updated at {Date(lastUpdated).toString()}
      </Typography>
      <Button
        variant='outlined'
        endIcon={<span className='material-icons'>refresh</span>}
        onClick={handleRefresh}
        sx={{
          marginTop: 1,
          border: '1px solid rgb(140, 92, 142)',
          color: 'rgb(140, 92, 142)',
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default Refresh;
