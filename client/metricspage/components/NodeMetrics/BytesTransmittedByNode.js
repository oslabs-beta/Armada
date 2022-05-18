import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';
import MetricsComponentWrapper from '../../../utils/MetricsComponentWrapper';

const BytesTransmittedByNode = ({ metrics }) => {
  return (
    <div>
      <LineChart
        title='Bytes Transmitted Per Node'
        label='Bytes Transmitted Per Node'
        chartData={metrics}
      />
    </div>
  );
};

export default BytesTransmittedByNode;
