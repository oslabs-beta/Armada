import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import mdColors from './MaterialColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = ({ chartData, title, label }) => {
  const options = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    responsive: true,
    pointRadius: 0,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
        padding: {
          bottom: 5,
        },
      },
    },
  };

  const objArr = [];
  if (!chartData.seriesLabels) console.log('title', title);
  const lineChartData = chartData.seriesLabels.forEach((el, index) => {
    const colors = mdColors;
    const rand = Math.floor(Math.random() * 3);
    objArr.push({
      data: chartData.seriesValues[index],
      label: chartData.seriesLabels[index],
      fill: true,
      borderColor: colors[(index * 3) % mdColors.length],
      backgroundColor: colors[(index * 3) % mdColors.length],
      pointHitRadius: 20,
    });
  });

  const data = {
    labels: chartData.timestamps,
    //for each element of seriesLabels, make a new object { data: seriesValues[i], label: seriesLabels[i] }
    datasets: objArr,
  };

  return (
    <div style={{ height: 500 }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
