const formatChartData = require('./formatChartData');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const metricsFetch = (query, title, req, res, next) => {
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals[title] = {};
        res.locals[title].data = formatted;
        res.locals[title].queryString = query;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with ${title}`,
      message: { err: err.message },
    });
  }
};

module.exports = metricsFetch;
