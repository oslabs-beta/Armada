const formatVectorData = (arr, metricName) => {
  return arr
    .sort((a, b) => parseFloat(b.value[1]) - parseFloat(a.value[1]))
    .map((node) => {
      return {
        label: node.metric[metricName],
        data: parseFloat(node.value[1]),
      };
    });
};

module.exports = formatVectorData;
