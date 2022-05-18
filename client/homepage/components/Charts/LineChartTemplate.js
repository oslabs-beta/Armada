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
// import faker from 'faker';

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
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
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
      },
    },
  };

  function filterOutliers(someArray) {
    // Copy the values, rather than operating on references to existing values
    var values = someArray.concat();

    // Then sort
    values.sort(function (a, b) {
      return a - b;
    });

    /* Then find a generous IQR. This is generous because if (values.length / 4)
     * is not an int, then really you should average the two elements on either
     * side to find q1.
     */
    var q1 = values[Math.floor(values.length / 4)];
    // Likewise for q3.
    var q3 = values[Math.ceil(values.length * (3 / 4))];
    var iqr = q3 - q1;

    // Then find min and max values
    var maxValue = q3 + iqr * 1.5;
    var minValue = q1 - iqr * 1.5;

    // Then filter anything beyond or beneath these values.
    var filteredValues = someArray.filter(function (x, index) {
      return x <= maxValue && x >= minValue;
    });

    // Then return
    return filteredValues;
  }
  ('use strict');
  function avg(v) {
    console.log(v);
    return v.reduce((a, b) => a + b, 0) / v.length;
  }

  function smoothOut(vector, variance) {
    var t_avg = avg(vector) * variance;
    var ret = Array(vector.length);
    for (var i = 0; i < vector.length; i++) {
      (function () {
        var prev = i > 0 ? ret[i - 1] : vector[i];
        var next = i < vector.length ? vector[i] : vector[i - 1];
        ret[i] = avg([t_avg, avg([prev, vector[i], next])]);
      })();
    }
    return ret;
  }

  const objArr = [];

  const lineChartData = chartData.seriesLabels.forEach((el, index) => {
    const colors = ['#33c9dc', '#ed4b82', '#cddc39', '#ffc107'];
    objArr.push({
      data: chartData.seriesValues[index],
      label: chartData.seriesLabels[index],
      borderColor: colors[index],
      backgroundColor: colors[index],
    });
  });

  console.log(objArr);
  const data = {
    labels: chartData.timestamps,
    //for each element of seriesLabels, make a new object { data: seriesValues[i], label: seriesLabels[i] }
    datasets: objArr,
  };

  // bytesReceivedPerNode {
  //   seriesLabels: [node1, node2, node3],
  //   seriesValues: [[],[],[]],
  //   timeStamps:[]
  // }

  // loop through timestamps
  // look at first 2 digits of the timestamp, 12:30 => 12
  // if 12 exists as a key already, push the cpu value into the array at that key
  // if 12 doesnt exist make a new key on object
  // {00:[],01:[]}

  return <Line options={options} data={data} />;
};

export default LineChart;
