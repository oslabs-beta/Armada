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
const metricsFetch = require('../utils/metricsFetch');
// can use to run specified commands that you'd otherwise need to write in terminal

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

const metricsDataController = {};

// CPU usage time series data, by Node
metricsDataController.getCPUUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  //sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{cluster="$cluster", namespace="$namespace"}) by (node)
  // let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (node) &start=2022-05-13T17:52:43.841Z&end=2022-05-14T21:52:43.841Z&step=30m`;
  // let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (node)`;
  // let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (node)`;
  // let query = `${prometheusURL}query?query=100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[10m]) * 100) * on(instance) group_left(nodename) (node_uname_info))`;

  // from the article:
  // for by node utilization:
  // let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",pod_name!=""}[5m])) by (node)`;
  // for namespace CPU utilization:
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNode');
  // try {
  //   fetch(query)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       const formatted = formatChartData(resp.data.result);
  //       res.locals.getCPUUsageByNode = formatted;
  //     })
  //     .then(() => next());
  // } catch (err) {
  //   return next({
  //     log: 'Error with getting getCPUUsageByNode',
  //     message: { err: err.message },
  //   });
  // }
};

metricsDataController.getCPUUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByPod');
  // try {
  //   fetch(query)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       const formatted = formatChartData(resp.data.result);
  //       res.locals.getCPUUsageByPod = formatted;
  //     })
  //     .then(() => next());
  // } catch (err) {
  //   return next({
  //     log: 'Error with getting getCPUUsageByPod',
  //     message: { err: err.message },
  //   });
  // }
};

metricsDataController.getCPUUsageByNamespace = async (req, res, next) => {
  const namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="${namespace}"})`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNamespace');

  // try {
  //   fetch(query)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       const formatted = formatChartData(resp.data.result);
  //       res.locals.getCPUUsageByNamespace = formatted;
  //     })
  //     .then(() => next());
  // } catch (err) {
  //   return next({
  //     log: 'Error with getting getCPUUsageByNamespace',
  //     message: { err: err.message },
  //   });
  // }
};

// Memory Usage By Node (TBU change to Namespace)
metricsDataController.getMemoryUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.getMemoryUsageByNode = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with getting getMemoryUsageByNode`,
      message: { err: err.message },
    });
  }
};

metricsDataController.getMemoryUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.getMemoryUsageByPod = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with getting getMemoryUsageByPod`,
      message: { err: err.message },
    });
  }
};

metricsDataController.getMemoryUsageByNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes{job="kubelet", metrics_path="/metrics/cadvisor", namespace="monitoring", container!="", image!=""})`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.getMemoryUsageByNamespace = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with getting getMemoryUsageByNamespace`,
      message: { err: err.message },
    });
  }
};

// Bytes Received Per Node (TBU change to Namespace)
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

metricsDataController.bytesReceivedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesReceivedPerPod = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes received per pod`,
      message: { err: err.message },
    });
  }
};

metricsDataController.bytesReceivedPerNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_receive_bytes_total{namespace="monitoring"}[5m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesReceivedPerPod = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes received per pod`,
      message: { err: err.message },
    });
  }
};

metricsDataController.bytesTransmittedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesTransmittedPerPod = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes transmitted per node`,
      message: { err: err.message },
    });
  }
};

metricsDataController.bytesTransmittedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesTransmittedPerPod = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes transmitted per pod`,
      message: { err: err.message },
    });
  }
};

metricsDataController.bytesTransmittedPerNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total{namespace="monitoring"}[5m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const formatted = formatChartData(resp.data.result);
        res.locals.bytesTransmittedPerNamespace = formatted;
      })
      .then(() => next());
  } catch (err) {
    next({
      log: `Error with bytes transmitted per namespace`,
      message: { err: err.message },
    });
  }
};

module.exports = metricsDataController;
