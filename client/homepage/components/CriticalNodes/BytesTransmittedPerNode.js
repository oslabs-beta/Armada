import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// [{label: '', data: },{}]
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

// horizontal bar charts
