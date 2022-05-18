import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Refresh = (props) => {
  const [timestamp, setTimestamp] = useState(new Date().toString());

  function setTime() {
    console.log('set time called');
    let time = new Date();
    time = time.toString();
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
    setTimestamp(time);
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
    >
      <Typography
        className='timestamp'
        color='text.secondary'
        variant='caption'
      >
        Last updated at {timestamp}{' '}
      </Typography>
      <Button
        variant='outlined'
        endIcon={<span className='material-icons'>refresh</span>}
        onClick={setTime}
        sx={{ marginTop: 1 }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default Refresh;
