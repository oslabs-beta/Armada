import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../utils/ComponentWrapper';

function PodsCount(props) {
  const { pods } = props;
  const podsCount = pods.length ? pods.length : '-';
  return (
    <ComponentWrapper title='Pods'>
      <Typography variant='h1'> {podsCount}</Typography>
    </ComponentWrapper>
  );
  // <Card>PodsCount </Card>;
}

export default PodsCount;
