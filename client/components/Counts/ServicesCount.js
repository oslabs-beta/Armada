import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import ComponentWrapper from '../../utils/ComponentWrapper';
import { Typography } from '@mui/material';

function ServicesCount(props) {
  const { services } = props;
  const servicesCount = services.length ? services.length : '-';
  return (
    <ComponentWrapper title='Services'>
      <Typography variant='h1'>{servicesCount}</Typography>
    </ComponentWrapper>
  );
}

export default ServicesCount;
