import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// Horizontal bar chart showing CPU usage by node
const CPUIntensiveNodes = ({ nodes }) => {
  return (
    <ComponentWrapper title='CPU Intensive Nodes'>
      <BarChart
        chartData={nodes}
        title='CPU Usage (%) by Nodes'
        label='CPU Usage (%) By Nodes'
      />
    </ComponentWrapper>
  );
};

export default CPUIntensiveNodes;
