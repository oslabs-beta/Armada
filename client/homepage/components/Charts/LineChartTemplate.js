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
  const [copiedText, setCopiedText] = useState();

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

  if (!chartData) return <div>No data available in {title}</div>;

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
  let id = 1;

  console.log('query string', query);
  return (
    <div style={{ height: 500 }}>
      <Line options={options} data={data} />
      <CopyToClipboard text={query} onCopy={() => setCopiedText({ query })}>
        <Button size='small'>Copy query to clipboard</Button>
      </CopyToClipboard>
    </div>
  );
};
/*
          query={metrics.queryString}
          http://127.0.0.1:9090/api/v1/query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (namespace)&start=2022-05-18T17:28:20.751Z&end=2022-05-19T17:28:20.751Z&step=30m
          http://127.0.0.1:9090/api/v1/query_range?query=sum(container_memory_working_set_bytes) by (namespace)&start=2022-05-18T17:28:20.751Z&end=2022-05-19T17:28:20.751Z&step=30m
*/

export default LineChart;
