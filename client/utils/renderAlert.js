import React from 'react';
import { Alert, Grid } from '@mui/material';

const renderAlert = (length, message, type) => {
  if (length === 0) {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Alert severity={type} sx={{ border: '1px solid grey' }}>
            {message}
          </Alert>
        </Grid>
      </Grid>
    );
  } else return null;
};

export default renderAlert;
