import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByNode = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO Received by Node'
          chartData={metrics.data}
          label='Bytes Received Per Node'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByNode;
