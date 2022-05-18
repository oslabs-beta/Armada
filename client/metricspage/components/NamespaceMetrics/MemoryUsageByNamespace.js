import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title='Memory Usage By Namespace'>
        <LineChart
          title='Memory Usage Per Namespace'
          chartData={metrics}
          label='Memory Usage Per Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByNamespace;
