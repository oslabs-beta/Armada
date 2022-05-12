import React from 'react';
import BarChart from '../Charts/BarChartTemplate';

const CPUIntensivePods = ({ pods }) => {
  return (
    <>
      CPU Intensive Pods
      <BarChart
        chartData={pods}
        title='CPU Usage by Pods'
        label='CPU Usage By Pods'
      />
    </>
  );
};

export default CPUIntensivePods;
