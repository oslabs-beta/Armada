import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByPod = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Memory Usage By Pod'
          label='Memory Usage By Pod'
          chartData={metrics}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByPod;
