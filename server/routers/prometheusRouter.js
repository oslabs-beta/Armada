const express = require('express');
const prometheusController = require('../controllers/prometheusController');
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
  '/metrics',
  prometheusController.getCpuUsageSecondsRateByName,
  // prometheusController.getClusterFreeMemory,
  // prometheusController.getNetworkTransmitBytes,
  (req, res) => {
    const chartData = {
      cpuUsageSecondsRate: res.locals.getCpuUsageSecondsRateByName,
      // clusterFreeMemory: res.locals.getClusterFreeMemory,
      // networkTransmitData: res.locals.getNetworkTransmitData,
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

module.exports = prometheusRouter;
