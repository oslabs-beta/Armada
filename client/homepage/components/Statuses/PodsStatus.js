import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import ComponentWrapper from '../../../utils/ComponentWrapper';

const PodsStatus = (props) => {
  const { pods } = props;
  const podsObj = {};
  for (let pod of pods) {
    podsObj[pod.metadata.name] = pod.status.phase;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [popperText, setPopperText] = React.useState([]);

  // Generate pod boxes
  const PodsBoxes = [];
  for (let key of Object.keys(podsObj)) {
    let boxStyle = {
      backgroundColor: '#3dce2d',
      border: '1px solid #39ba2a',
      borderRadius: '3px',
      width: '30px',
      height: '30px',
      margin: '1px',
    };
    if (podsObj[key] !== 'Running') {
      boxStyle['background-color'] = 'red';
    }
    PodsBoxes.push(
      <div className='pod-box-label' key={key}>
        <button
          id={`PODBUTTON${key}`}
          type='button'
          onClick={(event) => handleClick(event, key)}
          style={boxStyle}
        ></button>
      </div>
    );
  }

  // Handleclick for popper
  const handleClick = (event, key) => {
    let popperHTML = [];
    popperHTML.push(<h3>Name: {key}</h3>);
    popperHTML.push(<p>Status: {podsObj[key]}</p>);
    setPopperText(popperHTML);
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  return (
    <ComponentWrapper title='Pod Status'>
      <Popper id='popper' open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'black' }}>
          <Typography sx={{ p: 2 }}>{popperText}</Typography>
        </Box>
      </Popper>
      <Box className='card' mt={1}>
        <div className='break'></div>
        <div className='card-content'>{PodsBoxes}</div>
      </Box>
    </ComponentWrapper>
  );
};

export default PodsStatus;
