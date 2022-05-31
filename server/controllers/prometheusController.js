const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const formatChartData = require('../utils/formatChartData');
const formatTimeToAvg = require('../utils/formatTimeToAvg');
const formatVectorData = require('../utils/formatVectorData');

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

// prometheusController handles fetch requests to Prometheus for the homepage
const prometheusController = {};

prometheusController.isUp = async (req, res, next) => {
  const queryStr = `${prometheusURL}query?query=up`;

  try {
    const response = await fetch(queryStr);
    res.locals.query = await response.json();
    return next();
  } catch (err) {
    return next(err);
  }
};

// Network IO transmitted by node as average over time
prometheusController.bytesTransmittedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(rate(node_network_transmit_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;

  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const resultArr = formatTimeToAvg(resp);
        res.locals.bytesTransmittedPerNode = resultArr;
      })
      .then(() => next())
      .catch((error) =>
        next({
          log: 'Error in bytesTransmittedPerNode',
          message: { err: error.message },
        })
      );
  } catch (err) {
    next({
      log: `Error with bytes transmitted per node`,
      message: { err: err.message },
    });
  }
};

// Network IO received by node as average over time
prometheusController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(rate(node_network_receive_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;

  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        const resultArr = formatTimeToAvg(resp);
        res.locals.bytesReceivedPerNode = resultArr;
      })
      .then(() => next())
      .catch((error) =>
        next({
          log: 'Error in bytesReceivedPerNode',
          message: { err: error.message },
        })
      );
  } catch (err) {
    next({
      log: `Error with bytes received per node`,
      message: { err: err.message },
    });
  }
};

// CPU Usage by node
prometheusController.getCpuUsageByNode = async (req, res, next) => {
  let query = `${prometheusURL}query?query=100 * avg by (instance) (rate(node_cpu_seconds_total{mode!="idle"}[1m]))`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;

    const cpuUsageByNode = formatVectorData(result, 'instance');

    res.locals.getCpuUsageByNode = cpuUsageByNode;
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting CPU usage by Node',
      message: { err: err.message },
    });
  }
};

// Total memory usage per node in the last week
prometheusController.getMemoryUsageByNode = async (req, res, next) => {
  let query = `${prometheusURL}query?query=sum(container_memory_working_set_bytes{container_name!="POD"}) by (node)`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;
    res.locals.getMemoryUsageByNode = formatVectorData(result, 'node');
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting memory usage by node',
      message: { err: err.message },
    });
  }
};

// Memory usage by pod (current)
prometheusController.getMemoryUsageByPod = async (req, res, next) => {
  const { namespace } = req.query;
  let query = '';
  if (namespace === 'All' || !namespace) {
    query = `${prometheusURL}query?query=sum(container_memory_working_set_bytes{container_name!="POD"}) by (pod)`;
  } else {
    query = `${prometheusURL}query?query=sum(container_memory_working_set_bytes{container_name!="POD", namespace="${namespace}"}) by (pod)`;
  }
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;
    res.locals.getMemoryUsageByPod = formatVectorData(result, 'pod');
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting memory usage by pod',
      message: { err: err.message },
    });
  }
};

// CPU Usage by pod (current)
prometheusController.getCpuUsageByPod = async (req, res, next) => {
  const { namespace } = req.query;
  let query;
  if (namespace === 'All' || !namespace) {
    query = `${prometheusURL}query?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (pod)`;
  } else {
    query = `${prometheusURL}query?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="${namespace}"}) by (pod)`;
  }
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;
    res.locals.getCpuUsageByPod = formatVectorData(result, 'pod');
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting cpu usage by pod',
      message: { err: err.message },
    });
  }
};

// CPU Utilization
prometheusController.getCpuUtilization = async (req, res, next) => {
  let query = `${prometheusURL}query?query=1 - sum(avg by (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal"}[10m])))`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result[0].value;
    res.locals.cpuUtilization = result[1];
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting cpu utilization',
      message: { err: err.message },
    });
  }
};

// Total CPU cores
prometheusController.getCpuTotal = async (req, res, next) => {
  let query = `${prometheusURL}query?query=count without(cpu, mode) (node_cpu_seconds_total{mode="idle"})`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result[0].value;
    res.locals.getCpuTotal = result[1];
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting CPU total',
      message: { err: err.message },
    });
  }
};

// Memory utilization
prometheusController.getMemoryUtilization = async (req, res, next) => {
  let query = `${prometheusURL}query?query=node_memory_Active_bytes/node_memory_MemTotal_bytes`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result[0].value;
    res.locals.memoryUtilization = result[1];
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting memory utilization',
      message: { err: err.message },
    });
  }
};

// Total memory
prometheusController.getMemoryTotal = async (req, res, next) => {
  let query = `${prometheusURL}query?query=sum(container_memory_working_set_bytes)`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result[0].value;
    res.locals.getMemoryTotal = result[1];
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting memory total',
      message: { err: err.message },
    });
  }
};

module.exports = prometheusController;
