import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import GaugeChartTemplate from '../Charts/GaugeChartTemplate';

function MemoryUtilization({ memory }) {
  const percentage = Math.floor();
  return (
    <ComponentWrapper title='Total Cluster Memory Utilization'>
      <GaugeChartTemplate
        chartData={memory}
        title='Total Cluster Memory Utilization'
        label='Total Cluster Memory Utilization'
      />
    </ComponentWrapper>
  );
}

export default MemoryUtilization;
