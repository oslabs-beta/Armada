import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByNode = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title='Memory Usage By Node'>
        <LineChart
          title='Memory Usage By Node'
          label='Memory Usage Node'
          chartData={metrics}
        />
      </MetricsComponentWrapper>
    </div>
  );
};
// //    <ComponentWrapper title='Deployments'>
// <Typography variant='h1'>{deploymentsCount}</Typography>
// </ComponentWrapper>
export default MemoryUsageByNode;
