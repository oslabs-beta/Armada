import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';

// Displays count of deployments in cluster
function DeploymentsCount(props) {
  const { deployments } = props;
  const deploymentsCount = deployments.length ? deployments.length : '-';
  return (
    <ComponentWrapper title='Deployments'>
      <Typography variant='h1'>{deploymentsCount}</Typography>
    </ComponentWrapper>
  );
}

export default DeploymentsCount;
