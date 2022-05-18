import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Memory Usage by Namespace'
          chartData={metrics.data}
          label='Memory Usage by Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByNamespace;
