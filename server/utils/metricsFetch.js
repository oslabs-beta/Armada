const formatChartData = require('./formatChartData');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Abstracted middleware function that executes metrics queries, formats response to chart data, and stores result in res.locals
const metricsFetch = (query, title, req, res, next) => {
  try {
    fetch(query)
      .then((resp) => resp.json())
      // Return formatted data and query string on res.locals
      .then((resp) => {
        res.locals[title] = {};
        if (resp.data.result.length !== 0) {
          const formatted = formatChartData(resp.data.result);
          res.locals[title].data = formatted;
        } else res.locals[title].data = null;
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
