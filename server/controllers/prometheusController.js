//from shipshape
//const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

//npm install node-fetch@2

const { spawn } = require('child_process');
const formatChartData = require('../utils/formatChartData');
const formatTimeToAvg = require('../utils/formatTimeToAvg');
const formatVectorData = require('../utils/formatVectorData');
// can use to run specified commands that you'd otherwise need to write in terminal

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

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

prometheusController.portPrometheus = (req, res, next) => {
  try {
    const process = spawn('kubectl', [
      '--namespace=default',
      'port-forward',
      'deploy/prometheus-server',
      '9090',
    ]);

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      if (code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
      console.log(`child process exited with code ${code}`);
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

prometheusController.bytesTransmittedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  // added bytes received per node
  let query = `${prometheusURL}query_range?query=sum(rate(node_network_transmit_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  //let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[2m])) by (node)&start=2022-05-11T17:52:43.841Z&end=2022-05-11T21:52:43.841Z&step=5m`;
  // let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)&start=2022-05-11T21:52:43.841Z&end=2022-05-11T21:52:43.841Z&step=5m`;
  //console.log('query before fetch', query);
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

prometheusController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(rate(node_network_receive_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  //let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[2m])) by (node)&start=2022-05-11T17:52:43.841Z&end=2022-05-11T21:52:43.841Z&step=5m`;
  // let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[1m])) by (instance) * on(instance) group_left(nodename) (node_uname_info)&start=2022-05-11T21:52:43.841Z&end=2022-05-11T21:52:43.841Z&step=5m`;
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

prometheusController.getCpuUsageByNode = async (req, res, next) => {
  let query = `${prometheusURL}query?query=100 * avg by (instance) (rate(node_cpu_seconds_total{mode!="idle"}[1m]))`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;

    const cpuUsageByNode = formatVectorData(result, 'instance');

    // console.log('cpu usage data', cpuUsageByNode);
    res.locals.getCpuUsageByNode = cpuUsageByNode;
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting CPU usage by Node',
      message: { err: err.message },
    });
  }
};

// total memory usage per node in the last week
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

prometheusController.getCpuUtilization = async (req, res, next) => {
  let query = `${prometheusURL}query?query=1 - sum(avg by (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal"}[10m])))`;
  try {
    const response = await fetch(query);
    const data = await response.json();
    const result = data.data.result;
    res.locals.cpuUtilization = data;
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting cpu utilization',
      message: { err: err.message },
    });
  }
};

module.exports = prometheusController;
