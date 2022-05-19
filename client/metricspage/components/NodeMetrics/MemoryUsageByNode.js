import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByNode = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Memory Usage By Node'
          label='Memory Usage Node'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByNode;
