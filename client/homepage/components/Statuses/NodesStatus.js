import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import parseStatus from '../../../utils/parseStatus';

const mapStateToProps = ({ nodes }) => {
  return nodes;
};

const NodesStatus = ({ items }) => {
  const nodesObj = parseStatus(items);
  // const [nodesObj, setNodesObj] = React.useState(parseStatus(items));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [popperText, setPopperText] = React.useState([]);

  // Handleclick for popper
  const handleClick = (event, key) => {
    console.log('key', key);
    let popperHTML = [];
    popperHTML.push(<h3>Name: {key}</h3>);
    for (let condition of Object.keys(nodesObj[key])) {
      popperHTML.push(
        <p>
          {condition}: {nodesObj[key][condition]}
        </p>
      );
      setPopperText(popperHTML);
    }
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  // Generate node boxes
  const NodeBoxes = [];
  for (let key of Object.keys(nodesObj)) {
    let boxStyle = {
      outline: 'none',
      backgroundColor: '#3dce2d',
      border: '1px solid #39ba2a',
      borderRadius: '3px',
      width: '30px',
      height: '30px',
      margin: '1px',
    };

    if (nodesObj[key]['Ready'] === 'False') {
      boxStyle['backgroundColor'] = '#ea2315';
      boxStyle['border'] = '1px solid #d82c20';
    } else if (nodesObj[key]['Ready'] === 'Unknown') {
      boxStyle['backgroundColor'] = 'yellow';
    }

    NodeBoxes.push(
      <div className='node-box' key={key}>
        <button
          id={`BUTTON${key}`}
          type='button'
          onClick={(event) => handleClick(event, key)}
          style={boxStyle}
        >
          <Card
            className='status-box'
            key={`NODE${key}`}
            name={key}
            status={nodesObj[key]}
          ></Card>
        </button>
      </div>
    );
  }

  return (
    <ComponentWrapper title='Node Status'>
      <Popper id='popper' open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, opacity: 1, bgcolor: 'black' }}>
          <Typography sx={{ p: 2 }}>{popperText}</Typography>
        </Box>
      </Popper>
      <Box className='card' mt={1}>
        <div className='break'></div>
        <div className='card-content'>{NodeBoxes}</div>
      </Box>
    </ComponentWrapper>
  );
};

export default connect(mapStateToProps)(NodesStatus);
