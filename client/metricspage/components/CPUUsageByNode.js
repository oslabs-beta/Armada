import React from 'react';
import LineChart from '../../homepage/components/Charts/LineChartTemplate';

const CPUUsageByNode = ({ metrics }) => {
  return (
    <div>
      <LineChart
        title='CPU Usage Per Node'
        label='CPU Usage Per Node'
        chartData={metrics}
      />
    </div>
  );
};

export default CPUUsageByNode;
