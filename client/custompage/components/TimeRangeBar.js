import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { Paper } from '@mui/material';

const optionsArray = [
  { label: '30 minutes' },
  { label: '1 hour' },
  { label: '2 hours' },
  { label: '5 hours' },
  { label: '12 hours' },
  { label: '24 hours' },
  { label: '48 hours' },
];
/* Renders time range dropdown on Custom Metrics page */

const TimeRangeBar = ({ searchquerytime, setsearchquerytime }) => (
  <Autocomplete
    disablePortal
    id='combo-box-demo'
    PaperComponent={({ children }) => (
      <Paper style={{ background: '#212121' }}>{children}</Paper>
    )}
    options={optionsArray}
    sx={{ width: 200 }}
    renderInput={(params) => <TextField {...params} label='Time Range' />}
    searchquery={searchquerytime}
    onInputChange={(e, newInputValue) => {
      e.preventDefault();
      setsearchquerytime(newInputValue);
    }}
  />
);

export default TimeRangeBar;
