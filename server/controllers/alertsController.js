const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

const alertsController = {};

alertsController.fetchAlerts = async (req, res, next) => {
  try {
    const data = await fetch(`${prometheusURL}/rules`);
    res.locals.alerts = await data.json();
    return next();
  } catch (err) {
    return next({
      log: 'Error in alertsController.fetchAlerts',
      message: { err: err.message },
    });
  }
};

module.exports = alertsController;
