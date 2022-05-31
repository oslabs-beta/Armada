import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';

const FreeMemoryByPod = ({ metrics }) => {
  /* 
Renders Free Memory Per Node line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Free Memory Per Node'
          label='Free Memory Per Node'
          chartData={metrics.data}
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default FreeMemoryByPod;
