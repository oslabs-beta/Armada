const PrometheusAPI = require('../controllers/promethusController')

const memory = {
  isPrometheusUp: { check: false },
};

module.exports = () => {
  return {
    prometheusAPI: new PrometheusAPI(memory),
  };
};