import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const CPUUsageByPod = ({ metrics }) => {
  /* 
Renders CPU Usage % by Pod line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='CPU Usage % by Pod'
          label='CPU Usage % By Pod'
          chartData={metrics.data}
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default CPUUsageByPod;
