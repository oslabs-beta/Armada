import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const CPUUsageByNode = ({ metrics }) => {
  /* 
Renders the CPU Usage % Per Node line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='CPU Usage % Per Node'
          label='CPU Usage % Per Node'
          chartData={metrics.data}
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default CPUUsageByNode;
