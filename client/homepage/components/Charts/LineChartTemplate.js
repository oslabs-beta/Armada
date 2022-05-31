import React, { useState } from 'react';
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
import { Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData, title, label, query }) => {
  // React hooks for "Copy Query to Clipboard" button and collapsing/expanding legend
  const [copiedText, setCopiedText] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    responsive: true,
    pointRadius: 0,
    plugins: {
      legend: {
        display: buttonClicked,
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          boxWidth: 6,
          boxHeight: 6,
          color: 'white',
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
        color: 'white',
        padding: {
          bottom: 15,
        },
      },
      datalabels: {
        // hide datalabels for all datasets
        display: false,
      },
    },
    scales: {
      xAxes: {
        display: true,
        ticks: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      yAxes: {
        display: true,
        ticks: {
          color: 'white',
        },
      },
    },
  };

  // if chart data is empty render "No data available"
  if (!chartData) return <div>No data available in {title}</div>;

  // Format chart data for line chart with varying colors
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
    datasets: objArr,
  };
  let id = 1;

  // Collapse or expand legend
  const handleLegendClick = () => {
    setButtonClicked((prevCheck) => !prevCheck);
  };

  return (
    <div style={{ height: 500 }}>
      <Line options={options} data={data} />
      <CopyToClipboard text={query} onCopy={() => setCopiedText({ query })}>
        <Button
          variant='outlined'
          size='small'
          sx={{ marginTop: 1, marginBottom: 3, marginRight: 2 }}
        >
          Copy query to clipboard
        </Button>
      </CopyToClipboard>
      <Button
        onClick={handleLegendClick}
        variant='outlined'
        size='small'
        sx={{ marginTop: 1, marginBottom: 3 }}
      >
        Show/Hide Legend
      </Button>
    </div>
  );
};

export default LineChart;
