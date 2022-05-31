import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// Horizontal bar chart of bytes received per node
const BytesReceivedPerNode = ({ promMetrics }) => {
  return (
    <ComponentWrapper title='Network IO Received by Node'>
      <BarChart
        chartData={promMetrics.bytesReceivedPerNode}
        title='Network IO (Bps) Received by Node'
        label='Network IO (Bps) Received by Node'
      />
    </ComponentWrapper>
  );
};

export default BytesReceivedPerNode;
