import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesTransmittedByNamespace = ({ metrics }) => {
  /* 
Renders Network IO (Bps) Transmitted by Namespace line chart on the Metrics Page
*/
  return (
    <div>
      <MetricsComponentWrapper title=''>
        <LineChart
          title='Network IO (Bps) Transmitted by Namespace'
          chartData={metrics.data}
          label='Bytes Transmitted Per Namespace'
          query={metrics.queryString}
        />
      </MetricsComponentWrapper>
    </div>
  );
};

export default BytesTransmittedByNamespace;
