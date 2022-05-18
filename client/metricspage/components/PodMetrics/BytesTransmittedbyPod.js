import React from 'react';
import LineChart from '../../../homepage/components/Charts/LineChartTemplate';

const BytesTransmittedbyPod = ({ metrics }) => {
  return (
    <div>
      <LineChart
        title='Bytes Transmitted By Pod'
        label='Bytes Transmitted By Pod'
        chartData={metrics}
      />
    </div>
  );
};

export default BytesTransmittedbyPod;
