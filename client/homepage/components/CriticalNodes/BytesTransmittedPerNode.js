import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// [{label: '', data: },{}]
const BytesTransmittedPerNode = ({ promMetrics }) => {
  return (
    <ComponentWrapper title='Bytes Transmitted Per Node'>
      <BarChart
        chartData={promMetrics.bytesTransmittedPerNode}
        title='Network Transmitted Bytes by Nodes'
        label='Network Transmitted Bytes By Nodes'
      />
    </ComponentWrapper>
  );
};

export default BytesTransmittedPerNode;

// horizontal bar charts
