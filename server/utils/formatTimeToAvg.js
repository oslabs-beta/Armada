const formatChartData = require('./formatChartData');

function formatTimeToAvg(resp) {
  const formatted = formatChartData(resp.data.result);
  const seriesValues = formatted.seriesValues;
  const newValues = [];
  seriesValues.forEach((value) => {
    const converted = value.map((el) => parseFloat(el));
    newValues.push(converted.reduce((a, b) => a + b) / converted.length);
  });
  formatted.seriesValues = newValues;
  const resultArr = [];
  for (let i = 0; i < formatted.seriesLabels.length; i++) {
    resultArr.push({
      label: formatted.seriesLabels[i],
      data: formatted.seriesValues[i],
    });
  }
  return resultArr;
}

module.exports = formatTimeToAvg;
