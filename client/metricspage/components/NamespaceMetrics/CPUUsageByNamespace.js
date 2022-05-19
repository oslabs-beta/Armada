import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const CPUUsageByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='CPU Usage % by Namespace'
          chartData={metrics.data}
          label='CPU Usage % by Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default CPUUsageByNamespace;
