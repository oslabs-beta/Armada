import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesReceivedByNode = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Bytes Received Per Node'
          chartData={metrics}
          label='Bytes Received Per Node'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesReceivedByNode;
