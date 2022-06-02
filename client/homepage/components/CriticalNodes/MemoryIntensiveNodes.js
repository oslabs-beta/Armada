import React from 'react';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import BarChart from '../Charts/BarChartTemplate';

// Horizontal bar chart showing memory usage bby node
const MemoryIntensiveNodes = ({ nodes }) => {
  const unitConverted = nodes.map((el) => {
    return { ...el, data: el.data / 1000000000 };
  });
  return (
    <ComponentWrapper title='Memory Intensive Nodes'>
      <BarChart
        chartData={unitConverted}
        title='Memory Usage (Gb) by Node'
        label='Memory Usage by (Gb) Node'
      />
    </ComponentWrapper>
  );
};

export default MemoryIntensiveNodes;
