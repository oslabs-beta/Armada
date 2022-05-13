import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ComponentWrapper from '../../utils/ComponentWrapper';

const NodesStatus = (props) => {
  const { nodes } = props;
  const nodesObj = {};
  for (let node of nodes) {
    nodesObj[node.metadata.name] = {};
    let conditions = node.status.conditions;
    for (let condition of conditions) {
      nodesObj[node.metadata.name][condition.type] = condition.status;
    }
  }

  const NodeBoxes = [];
  for (let key of Object.keys(nodesObj)) {
    let boxStyle = {
      backgroundColor: '#3dce2d',
      border: '1px solid #39ba2a',
      borderRadius: '3px',
      width: '20px',
      height: '20px',
      margin: '1px',
    };

    if (nodesObj[key]['Ready'] === 'False') {
      boxStyle['background-color'] = 'red';
    } else if (nodesObj[key]['Ready'] === 'Unknown') {
      boxStyle['background-color'] = 'yellow';
    }

    let tooltipText = `Name: ${key}\n`;
    for (let condition of Object.keys(nodesObj[key])) {
      tooltipText += `${condition}: ${nodesObj[key][condition]}\n`;
    }

    NodeBoxes.push(
      <div className='node-box'>
        <Tooltip title={tooltipText}>
          <Box
            className='status-box'
            style={boxStyle}
            key={key}
            name={key}
            status={nodesObj[key]}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <ComponentWrapper title='Node Status'>
      <div className='card'>
        {/* <h4 className='card-label'>Node Status</h4> */}
        <div className='break'></div>
        <div className='card-content'>{NodeBoxes}</div>
      </div>
    </ComponentWrapper>
  );
};

export default NodesStatus;
