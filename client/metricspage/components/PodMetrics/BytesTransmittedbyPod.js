import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesTransmittedbyPod = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO Transmitted by Pod'
          label='Bytes Transmitted By Pod'
          chartData={metrics.data}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesTransmittedbyPod;
