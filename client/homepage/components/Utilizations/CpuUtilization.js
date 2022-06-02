import React, { useState, useEffect } from 'react';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import GaugeChartTemplate from '../Charts/GaugeChartTemplate';

function CpuUtilization({ cpu }) {
  return (
    <GaugeChartTemplate
      chartData={cpu}
      title='Cluster CPU Usage'
      label='Cluster CPU Usage'
    />
  );
}

export default CpuUtilization;
