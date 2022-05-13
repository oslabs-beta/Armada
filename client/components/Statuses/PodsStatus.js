import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import ComponentWrapper from '../../utils/ComponentWrapper';

const PodsStatus = (props) => {
  const { pods } = props;
  const podsObj = {};
  for (let pod of pods) {
    podsObj[pod.metadata.name] = pod.status.phase;
  }

  const PodsBoxes = [];

  for (let key of Object.keys(podsObj)) {
    let boxStyle = {
      backgroundColor: '#3dce2d',
      border: '1px solid #39ba2a',
      borderRadius: '3px',
      width: '20px',
      height: '20px',
      margin: '1px',
    };
    if (podsObj[key] !== 'Running') {
      boxStyle['background-color'] = 'red';
    }
    PodsBoxes.push(
      <div className='pod-box-label'>
        <Tooltip title={key}>
          <Card
            style={boxStyle}
            key={key}
            name={key}
            status={podsObj[key]}
          ></Card>
        </Tooltip>
      </div>
    );
  }

  return (
    <ComponentWrapper title='Pod Status'>
      <div className='card'>
        {/* <h4 className='card-label'>Pod Status</h4> */}
        <div className='break'></div>
        <div className='card-content'>{PodsBoxes}</div>
      </div>
    </ComponentWrapper>
  );
};

export default PodsStatus;
