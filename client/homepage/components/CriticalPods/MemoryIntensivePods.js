import React from 'react';
import BarChart from '../Charts/BarChartTemplate';
import { MAX_SERIES } from '../../../actions/constants/chartConstants';
import ComponentWrapper from '../../../utils/ComponentWrapper';

const MemoryIntensivePods = ({ pods }) => {
  const unitConverted = pods.map((el) => {
    return { ...el, data: el.data / 1000000000 };
  });
  return (
    <ComponentWrapper title=' Memory Intensive Pods'>
      <BarChart
        chartData={unitConverted.slice(0, MAX_SERIES)}
        title='Memory Usage (gb) By Pods'
        label='Memory Usage (gb) By Pods'
      />
    </ComponentWrapper>
  );
};

export default MemoryIntensivePods;
