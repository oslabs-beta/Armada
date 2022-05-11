//from shipshape
//const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

//npm install node-fetch@2

const { spawn } = require('child_process');
const formatChartData = require('../utils/formatChartData');
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

prometheusController.getCpuUsageSecondsRateByName = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.params;

  let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (namespace)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;

  try {
    const data = await fetch(query);
    const result = await data.json();
    console.log(`this is the cpu data: ${result}`);

    // const formattedData = formatChartData(result);
    // res.locals.getCpuUsageSecondsRate = formattedData;
    res.locals.getCpuUsageSecondsRate = result;
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting CpuUsageSecondsRateByName',
      message: { err: err.message },
    });
  }
};

prometheusController.getClusterFreeMemory = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.params;
  let query = `${prometheusURL}query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    const data = await fetch(query);
    const result = await data.json();
    console.log(`this is the cluster memory data: ${result.result}`);
    // const formattedData = formatChartData(result);
    // res.locals.getClusterFreeMemory = formattedData;
    res.locals.getClusterFreeMemory = result;
    return next();
  } catch (err) {
    next({
      log: `Error with getting Cluster Free Memory`,
      message: { err: err.message },
    });
  }
};

prometheusController.getNetworkTransmitBytes = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.params;
  let query = `${prometheusURL}query_range?query=sum(rate(node_network_transmit_bytes_total[2m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    const data = await fetch(query);
    const result = await data.json();
    console.log(`this is the network bytes data: ${result}`);
    // const formattedData = formatChartData(result);
    // res.locals.getNetworkTransmitData = formattedData;
    res.locals.getNetworkTransmitData = result;
    return next();
  } catch (err) {
    next({
      log: `Error with getting Network Transmit Memory`,
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
    const cpuUsageByNode = result
      .sort((a, b) => parseFloat(a.value[1]) - parseFloat(b.value[1]))
      .map((node) => {
        return { label: node.metric.instance, data: parseFloat(node.value[1]) };
      });

    console.log('cpu usage data', cpuUsageByNode);
    res.locals.getCpuUsageByNode = cpuUsageByNode;
    return next();
  } catch (err) {
    return next({
      log: 'Error with getting CPU usage by Node',
      message: { err: err.message },
    });
  }
};

module.exports = prometheusController;
