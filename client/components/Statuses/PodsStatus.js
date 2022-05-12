import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const PodsStatus = (props) => {
  const { pods } = props;
  const podsObj = {};
  for (let pod of pods) {
    podsObj[pod.metadata.name] = pod.status.phase;
  }

  const PodsBoxes = [];

  for (let key of Object.keys(podsObj)) {
    let boxStyle = {
      'background-color': 'green',
      width: '20px',
      height: '20px',
    };
    if (podsObj[key] !== 'Running') {
      boxStyle['background-color'] = 'red';
    }
    PodsBoxes.push(
      <div className='pod-box-label'>
        <Box
          className='status-box'
          style={boxStyle}
          key={key}
          name={key}
          status={podsObj[key]}
        >
          <div className='status-label'>{key}</div>
        </Box>
      </div>
    );
  }

  return <div className='statusBox'>Pod Status {PodsBoxes}</div>;
};

export default PodsStatus;
