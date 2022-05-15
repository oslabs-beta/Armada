const express = require('express');
const prometheusController = require('../controllers/prometheusController');
const metricsDataController = require('../controllers/metricsDataController');
const prometheusRouter = express.Router();

// route to deploy prometheus onto the Cluster
prometheusRouter.post('/install', (req, res) => {
  res.status(200).json('Prometheus Fired Up');
});

// trial route to get data from prometheus after nodeporting
prometheusRouter.get('/up', prometheusController.isUp, (req, res) => {
  res.status(200).json(res.locals.query);
});

prometheusRouter.get(
  '/port',
  prometheusController.portPrometheus,
  (req, res) => {
    res.status(200).send('port on');
  }
);

prometheusRouter.get(
  '/homepage',
  prometheusController.bytesTransmittedPerNode,
  prometheusController.bytesReceivedPerNode,
  (req, res) => {
    const chartData = {
      bytesTransmittedPerNode: res.locals.bytesTransmittedPerNode,
      bytesReceivedPerNode: res.locals.bytesReceivedPerNode,
    };
    res.status(200).json(chartData);
  }
);

prometheusRouter.get(
  '/metricspage',
  metricsDataController.getFreeMemoryPerNode,
  metricsDataController.getCPUUsageByNamespace,
  metricsDataController.bytesReceivedPerNode,
  (req, res) => {
    const chartData = {
      getCPUUsageByNamespace: res.locals.getCPUUsageByNamespace,
      bytesReceivedPerNode: res.locals.bytesReceivedPerNode,
      getFreeMemoryPerNode: res.locals.getFreeMemoryPerNode,
    };
    res.status(200).json(chartData);
  }
);

prometheusRouter.get(
  '/cpubynode',
  prometheusController.getCpuUsageByNode,
  (req, res) => {
    res.status(200).json(res.locals.getCpuUsageByNode);
  }
);

prometheusRouter.get(
  '/memorybynode',
  prometheusController.getMemoryUsageByNode,
  (req, res) => {
    res.status(200).json(res.locals.getMemoryUsageByNode);
  }
);

prometheusRouter.get(
  '/cpubypod',
  prometheusController.getCpuUsageByPod,
  (req, res) => {
    res.status(200).json(res.locals.getCpuUsageByPod);
  }
);

prometheusRouter.get(
  '/memorybypod',
  prometheusController.getMemoryUsageByPod,
  (req, res) => {
    res.status(200).json(res.locals.getMemoryUsageByPod);
  }
);

module.exports = prometheusRouter;
