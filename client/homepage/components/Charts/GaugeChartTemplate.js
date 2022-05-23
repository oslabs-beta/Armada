import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function GaugeChartTemplate({ chartData, title, label }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: 'blue',
        font: {
          size: 34,
        },
        padding: {
          top: 30,
          bottom: 30,
        },
        responsive: true,
        animation: {
          animateScale: true,
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: chartData,
  };
  return (
    <div style={{ height: 500 }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default GaugeChartTemplate;
