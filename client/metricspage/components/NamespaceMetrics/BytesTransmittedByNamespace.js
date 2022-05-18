import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesTransmittedByNamespace = ({ metrics }) => {
  return (
    <div>
      <MetricsComponentWrapper title='Bytes Transmitted By Namespace'>
        <LineChart
          title='Bytes Transmitted Per Namespace'
          chartData={metrics}
          label='Bytes Transmitted Per Namespace'
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesTransmittedByNamespace;
