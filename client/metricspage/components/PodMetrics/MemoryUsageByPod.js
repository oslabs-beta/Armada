import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const MemoryUsageByPod = ({ metrics }) => {
  for (let i = 0; i < metrics.data.seriesValues.length; i++) {
    metrics.data.seriesValues[i] = metrics.data.seriesValues[i].map((el) => {
      return el / 1000000000;
    });
  }

  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Memory Usage (Gb) by Pod'
          label='Memory Usage By Pod'
          chartData={metrics.data}
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default MemoryUsageByPod;
