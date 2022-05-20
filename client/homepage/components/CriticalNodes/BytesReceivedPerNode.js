import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

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

// horizontal bar charts
