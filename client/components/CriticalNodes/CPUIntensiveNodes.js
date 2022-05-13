import React from 'react';
import ComponentWrapper from '../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

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

// horizontal bar charts
