const formatChartData = require('./formatChartData');

// Format time series data from Prometheus as averages over period of time
function formatTimeToAvg(resp) {
  const formatted = formatChartData(resp.data.result);
  const seriesValues = formatted.seriesValues;
  const newValues = [];

  // Take an average of time series data over the length of the array
  seriesValues.forEach((value) => {
    const converted = value.map((el) => parseFloat(el));
    newValues.push(converted.reduce((a, b) => a + b) / converted.length);
  });
  formatted.seriesValues = newValues;
  const resultArr = [];

  // Reformat averaged result with label and data keys for bar graphs on client side
  for (let i = 0; i < formatted.seriesLabels.length; i++) {
    resultArr.push({
      label: formatted.seriesLabels[i],
      data: formatted.seriesValues[i],
    });
  }
  return resultArr;
}

module.exports = formatTimeToAvg;
