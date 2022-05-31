import React from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';

// CPU used out of total
const CpuTotal = ({ cpu, cpuusage }) => {
  return (
    <>
      <ComponentWrapper title='Cluster CPU Usage (Cores)'>
        <Typography variant='h1'>{cpu * (cpuusage / 100)}</Typography>
        <Typography variant='h4' style={{ color: 'rgb(140, 92, 142)' }}>
          used
        </Typography>
        <Typography variant='h1'>{cpu}</Typography>
        <Typography variant='h4' style={{ color: 'rgb(140, 92, 142)' }}>
          total
        </Typography>
      </ComponentWrapper>
    </>
  );
};

export default CpuTotal;
