import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByNamespace = ({ metrics }) => {
  /* 
Converts Memory Usage from Bytes to GB
*/
  if (metrics.data) {
    for (let i = 0; i < metrics.data.seriesValues.length; i++) {
      metrics.data.seriesValues[i] = metrics.data.seriesValues[i].map((el) => {
        return el / 1000000000;
      });
    }
  }
  /* 
Renders Memory Usage (Gb) by Namespace line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Memory Usage (Gb) by Namespace'
          chartData={metrics.data}
          label='Memory Usage by Namespace'
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByNamespace;
