import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesTransmittedByNode = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO Transmitted by Node'
          label='Bytes Transmitted Per Node'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesTransmittedByNode;
