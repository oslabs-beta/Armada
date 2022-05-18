import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper>
        <LineChart
          title='Bytes Received Per Namespace'
          chartData={metrics}
          label='Bytes Received Per Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByNamespace;
