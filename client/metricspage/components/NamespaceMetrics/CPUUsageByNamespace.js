import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const CPUUsageByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper>
        <LineChart
          title='CPU Usage Per Namespace'
          chartData={metrics}
          label='CPU Usage Per Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default CPUUsageByNamespace;
