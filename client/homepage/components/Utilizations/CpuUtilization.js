import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';

function CpuUtilization(props) {
  const { cpuUtilization } = props;
  const percentage = Math.floor();
  return (
    <ComponentWrapper title='Deployments'>
      {/* <Typography variant='h1'>{deploymentsCount}</Typography> */}
    </ComponentWrapper>
  );
}

export default CpuUtilization;
