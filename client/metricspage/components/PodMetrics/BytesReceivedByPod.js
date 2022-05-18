import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByPod = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO Received by Pod'
          label='Bytes Received By Pod'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByPod;
