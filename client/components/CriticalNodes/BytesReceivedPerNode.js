import React from 'react';
import ComponentWrapper from '../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

const BytesReceivedPerNode = ({ promMetrics }) => {
  return (
    <ComponentWrapper title='Bytes Received Per Node'>
      <BarChart
        chartData={promMetrics.bytesReceivedPerNode}
        title='Network Received Bytes by Nodes'
        label='Network Received Bytes By Nodes'
      />
    </ComponentWrapper>
  );
};

export default BytesReceivedPerNode;

// horizontal bar charts
