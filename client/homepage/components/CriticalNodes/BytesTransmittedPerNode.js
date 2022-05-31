import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// Horizontal bar chart of bytes transmitted per node
const BytesTransmittedPerNode = ({ promMetrics }) => {
  return (
    <ComponentWrapper title='Network IO Transmitted by Nodes'>
      <BarChart
        chartData={promMetrics.bytesTransmittedPerNode}
        title='Network IO (Bps) Transmitted by Nodes'
        label='Network IO (Bps) Transmitted by Nodes'
      />
    </ComponentWrapper>
  );
};

export default BytesTransmittedPerNode;
