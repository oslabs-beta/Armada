import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { Paper } from '@mui/material';

const optionsArray = [
  { label: '30 seconds' },
  { label: '1 minute' },
  { label: '2 minutes' },
  { label: '5 minutes' },
  { label: '10 minutes' },
];
/* Renders step range dropdown on Custom Metrics page */

const StepBar = ({ searchquerystep, setsearchquerystep }) => (
  <Autocomplete
    disablePortal
    id='combo-box-demo'
    PaperComponent={({ children }) => (
      <Paper style={{ background: '#212121' }}>{children}</Paper>
    )}
    options={optionsArray}
    sx={{ width: 200 }}
    renderInput={(params) => <TextField {...params} label='Step' />}
    searchquery={searchquerystep}
    onInputChange={(e, newInputValue) => {
      e.preventDefault();
      setsearchquerystep(newInputValue);
    }}
  />
);

export default StepBar;
