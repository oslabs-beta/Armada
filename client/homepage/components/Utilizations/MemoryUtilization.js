import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import GaugeChartTemplate from '../Charts/GaugeChartTemplate';

function MemoryUtilization({ memory }) {
  return (
    <GaugeChartTemplate
      chartData={memory}
      title='Cluster Memory Usage'
      label='Cluster Memory Usage'
    />
  );
}

export default MemoryUtilization;
