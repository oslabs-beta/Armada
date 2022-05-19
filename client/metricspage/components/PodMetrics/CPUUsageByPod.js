import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const CPUUsageByPod = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='CPU Usage % By Pod'
          label='CPU Usage % By Pod'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default CPUUsageByPod;
