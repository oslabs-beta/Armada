//from shipshape
//const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// query_range?query=sum(rate(node_network_transmit_bytes_total[2m]))&start=2022-05-11T17:52:43.841Z&end=2022-05-11T21:52:43.841Z&step=5m
//npm install node-fetch@2

const { spawn } = require('child_process');
const formatChartData = require('../utils/formatChartData');
const formatTimeToAvg = require('../utils/formatTimeToAvg');
const formatVectorData = require('../utils/formatVectorData');
// can use to run specified commands that you'd otherwise need to write in terminal

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

const metricsDataController = {};

// CPU usage time series data, by Namespace
metricsDataController.getCPUUsageByNamespace = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (namespace) &start=2022-05-13T17:52:43.841Z&end=2022-05-14T21:52:43.841Z&step=30m`;
  //let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (namespace)`;
  //query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;

  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.getCPUUsageByNamespace = formatted;
      })
      .then(() => next());
  } catch (err) {
    return next({
      log: 'Error with getting getCPUUsageByNamespace',
      message: { err: err.message },
    });
  }
};

// Free Memory per Node (TBU change to Namespace)
metricsDataController.getFreeMemoryPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_memory_MemFree_bytes[2m])) by (instance) * on (instance) group_left(nodename) (node_uname_info) &start=2022-05-13T17:52:43.841Z&end=2022-05-14T21:52:43.841Z&step=30m`;
  //let query = `${prometheusURL}query_range?query=sum(rate(node_memory_MemFree_bytes[2m])) by (instance) * on (instance) group_left(nodename) (node_uname_info)`;
  //query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(`this is getFreeMemoryPerNode: ${resp}`);
        const formatted = formatChartData(resp.data.result);
        res.locals.getFreeMemoryPerNode = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with getting Free Memory Per Node`,
      message: { err: err.message },
    });
  }
};

// Bytes Received Per Node (TBU change to Namespace)
metricsDataController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  // let query = `${prometheusURL}query_range?query=sum(rate(node_network_receive_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)`;
  // query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)&start=2022-05-13T21:52:43.841Z&end=2022-05-14T21:52:43.841Z&step=5m`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(`this is getFreeMemoryPerNode: ${resp}`);
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

module.exports = metricsDataController;
