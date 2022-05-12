import React from 'react';
import BarChart from '../Charts/BarChartTemplate';

const MemoryIntensiveNodes = ({ nodes }) => {
  // const options = {
  //   indexAxis: 'y',
  //   elements: {
  //     bar: {
  //       borderWidth: 2,
  //     },
  //   },
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Horizontal Bar Chart',
  //     },
  //   },
  // };
  // const data = {
  //   labels: nodes.map((el) => el.label),
  //   datasets: [
  //     {
  //       label: 'Memory Usage By Node',
  //       data: nodes.map((el) => el.data),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      Memory Intensive Nodes
      <BarChart
        chartData={nodes}
        title='Memory Usage by Node'
        label='Memory Usage by Node'
      />
      {/* <Bar options={options} data={data} /> */}
    </>
  );
};

export default MemoryIntensiveNodes;
