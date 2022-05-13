import React from 'react';
import BarChart from '../Charts/BarChartTemplate';
import ComponentWrapper from '../../utils/ComponentWrapper';
import { MAX_SERIES } from '../../actions/constants/chartConstants';

const CPUIntensivePods = ({ pods }) => {
  return (
    <ComponentWrapper title='CPU Intensive Pods'>
      <BarChart
        chartData={pods.slice(0, MAX_SERIES)}
        title='CPU Usage (%) by Pods'
        label='CPU Usage (%) By Pods'
      />
    </ComponentWrapper>
  );
};

export default CPUIntensivePods;
