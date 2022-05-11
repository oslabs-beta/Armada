import React, { useState, useEffect } from 'react';

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

  return <div className='nodeStatus'></div>;
};

export default NodesStatus;
