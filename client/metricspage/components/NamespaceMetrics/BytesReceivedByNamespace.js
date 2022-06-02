import React, { useState } from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';
import { Button } from '@mui/material';

const BytesReceivedByNamespace = ({ metrics }) => {
  /* 
Renders the Network IO (Bps) Received by Namespace line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO (Bps) Received by Namespace'
          chartData={metrics.data}
          label='Network IO Received by Namespace'
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByNamespace;
