import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByPod = ({ metrics }) => {
  /* 
Renders the Network IO (Bps) Received by Pod line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO (Bps) Received by Pod'
          label='Bytes Received By Pod'
          chartData={metrics.data}
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByPod;
