import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const NodesStatus = (props) => {
  const { nodes } = props;
  const nodesObj = {};
  for (let node of nodes) {
    let conditions = node.status.conditions;
    for (let condition of conditions) {
      if (condition.type === 'Ready') {
        nodesObj[node.metadata.name] = condition.status;
      }
    }
  }

  const NodeBoxes = [];

  for (let key of Object.keys(nodesObj)) {
    let boxStyle = {
      'background-color': 'green',
      width: '20px',
      height: '20px',
    };
    if (nodesObj[key] !== 'True') {
      boxStyle['background-color'] = 'red';
    }
    NodeBoxes.push(
      <div className='node-box-label'>
        <Box
          className='status-box'
          style={boxStyle}
          key={key}
          name={key}
          status={nodesObj[key]}
        >
          <div className='status-label'>{key}</div>
        </Box>
      </div>
    );
  }

  return <div className='statusBox'>Node Status {NodeBoxes}</div>;
};

export default NodesStatus;
