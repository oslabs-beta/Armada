import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({ chartData, title, label }) => {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels: chartData.map((el) => el.label),
    datasets: [
      {
        // label,
        data: chartData.map((el) => el.data),
        borderColor: 'transparent',
        backgroundColor: 'rgb(140, 92, 142)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;

// horizontal bar charts
