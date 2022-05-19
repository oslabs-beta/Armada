import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO Received by Namespace'
          chartData={metrics.data}
          label='Network IO Received by Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByNamespace;
