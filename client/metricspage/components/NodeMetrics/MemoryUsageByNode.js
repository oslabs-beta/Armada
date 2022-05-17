import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';

const MemoryUsageByNode = ({ metrics }) => {
  return (
    <div>
      <LineChart
        title='Free Memory Per Node'
        label='Free Memory Per Node'
        chartData={metrics}
      />
    </div>
  );
};

export default MemoryUsageByNode;
