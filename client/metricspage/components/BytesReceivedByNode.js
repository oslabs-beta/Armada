import React from 'react';
//import LineChart from '../../homepage/components/Charts/LineChartTemplate';
import LineChart from '../../homepage/components/Charts/LineChartTemplate';

const BytesReceivedByNode = ({ metrics }) => {
  return (
    <div>
      <LineChart
        title='Bytes Received Per Node'
        chartData={metrics}
        label='Bytes Received Per Node'
      />
    </div>
  );
};

export default BytesReceivedByNode;
