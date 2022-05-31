import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { Paper } from '@mui/material';

const SearchBar = ({ searchquery, setsearchquery, options }) => {
  let optionsArray = [];
  if (options) {
    for (let i = 0; i < options.length; i++) {
      optionsArray.push({ label: options[i] });
    }
  }
  /* Renders options dropdown on Custom Metrics page */

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      PaperComponent={({ children }) => (
        <Paper style={{ background: '#212121' }}>{children}</Paper>
      )}
      options={optionsArray}
      sx={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label='PromQL Query' />}
      searchquery={searchquery}
      onInputChange={(e, newInputValue) => {
        e.preventDefault();
        setsearchquery(newInputValue);
      }}
    />
  );
};

export default SearchBar;
