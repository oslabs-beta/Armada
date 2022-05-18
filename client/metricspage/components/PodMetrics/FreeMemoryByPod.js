import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';

const FreeMemoryByPod = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Free Memory Per Node'
          label='Free Memory Per Node'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default FreeMemoryByPod;
