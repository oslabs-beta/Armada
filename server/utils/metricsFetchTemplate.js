const metricsFetchTemplate = (queryString, title) => {
    try {
        fetch(query)
          .then((resp) => resp.json())
          .then((resp) => {
            const formatted = formatChartData(resp.data.result);
            res.locals[title] = formatted;
          })
          .then(() => next());
      } catch (err) {
        next({
          log: `Error with ${title}`,
          message: { err: err.message },
        });
      }
}

module.exports = 

/*

metricsDataController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesReceivedPerNode = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes received per node`,
      message: { err: err.message },
    });
  }
};
*/