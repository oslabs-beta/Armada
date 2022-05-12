import React from 'react';
import BarChart from '../Charts/BarChartTemplate';

const CPUIntensiveNodes = ({ nodes }) => {
  return (
    <>
      CPU Intensive Nodes
      <BarChart
        chartData={nodes}
        title='CPU Usage by Nodes'
        label='CPU Usage By Nodes'
      />
    </>
  );
};

export default CPUIntensiveNodes;

// horizontal bar charts
