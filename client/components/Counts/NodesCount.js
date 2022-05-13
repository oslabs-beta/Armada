import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../utils/ComponentWrapper';

function NodesCount(props) {
  const { nodes } = props;
  const nodesCount = nodes.length ? nodes.length : '-';
  return (
    <ComponentWrapper title='Nodes'>
      <Typography variant='h1'> {nodesCount}</Typography>
    </ComponentWrapper>
  );
}

export default NodesCount;
