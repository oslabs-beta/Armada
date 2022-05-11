//from shipshape
const fetch = require('node-fetch');
//npm install node-fetch@2

const { spawn } = require('child_process');
const formatChartData = require('../utils/formatChartData')
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
    const process = spawn('kubectl', ['--namespace=default', 'port-forward', 'deploy/prometheus-server', '9090'])

    process.stdout.on('data', data => {
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

prometheusController.getCpuUsageSecondsRateByName = (req, res, next)=>{
    const {startDateTime, endDateTime, step} = req.params;

    let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (namespace)`;
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;

    try {
    const data = await fetch(query).then( ({ data }) => data.result);

    const formattedData = formatChartData(data);

    res.locals.getCpuUsageSecondsRate = formattedData;
     return next();
    }
    catch(err){
       return next({log: 'Error with getting CpuUsageSecondsRateByName', message: {err: err.message}})
    }
}

prometheusController.getClusterFreeMemory = (req, res, next) => {
  const {startDateTime, endDateTime, step} = req.params
  let query = `${prometheusURL}query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  try {
    const data = await fetch(query).then(({ data}) => data.result);
    const formattedData = formatChartData(data);

    res.locals.getClusterFreeMemory = formattedData
    return next();
  } catch (err) {
    next({log: `Error with getting Cluster Free Memory`, message: {err: err.message}})
  }
}

prometheusController.getNetworkTransmitBytes = (req,res, next)=>{
    const {startDateTime, endDateTime, step} = req.params;
    let query = `${prometheusURL}query_range?query=sum(rate(node_network_transmit_bytes_total[2m]))`;
    query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
    try {
        const data = await fetch(query).then(({ data}) => data.result)
        const formattedData = formatChartData(data)
    
        res.locals.getNetworkTransmitData = formattedData
        return next()
      } catch (err) {
        next({log: `Error with getting Network Transmit Memory`, message: {err: err.message}})
      }
}


module.exports = prometheusController;