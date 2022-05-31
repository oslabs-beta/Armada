import React from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';

const MemoryTotal = ({ memory, memusage }) => {
  let memoryinGb;
  if (memory) {
    memoryinGb = Number((memory / 10 ** 9).toFixed(0));
  }

  return (
    <>
      <ComponentWrapper title='Cluster Memory Usage (GB)'>
        <Typography variant='h1'>{memoryinGb}</Typography>
        <Typography variant='h4' style={{ color: 'rgb(140, 92, 142)' }}>
          used
        </Typography>
        <Typography variant='h1'>
          {(memoryinGb / (memusage / 100)).toFixed(0)}
        </Typography>
        <Typography variant='h4' style={{ color: 'rgb(140, 92, 142)' }}>
          total
        </Typography>
      </ComponentWrapper>
    </>
  );
};

export default MemoryTotal;
