const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const metricsFetch = require('../utils/metricsFetch');
const { TIMESTEP } = require('../utils/constants');

const { prometheusURL } = require('../utils/constants');

// const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

// metricsDataController handles all fetch requests to Prometheus for the Metrics page and Custom Metrics page
const metricsDataController = {};

// fetch list of Prometheus queries for Custom Metrics page
metricsDataController.allQueries = async (req, res, next) => {
  let query = `${prometheusURL}label/__name__/values`;
  try {
    fetch(query)
      .then((resp) => resp.json())
      .then((resp) => {
        res.locals.allQueries = resp.data;
        return next();
      });
  } catch (err) {
    next({
      log: `Error with fetching all queries`,
      message: { err: err.message },
    });
  }
};

// fetch time series metrics with user-selected query selected on Custom Metrics page
metricsDataController.getCustomQueryMetrics = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace, queryString } =
    req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=${queryString}${namespaceString}`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCustomQueryMetrics', req, res, next);
};

// CPU usage (time series), by node
metricsDataController.getCPUUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate${namespaceString}) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNode', req, res, next);
};

// CPU usage (time series), by pod
metricsDataController.getCPUUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate${namespaceString}) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByPod', req, res, next);
};

// CPU usage (time series), by namespace
metricsDataController.getCPUUsageByNamespace = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate${namespaceString}) by (namespace)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNamespace', req, res, next);
};

// Memory usage (time series), by node
metricsDataController.getMemoryUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes${namespaceString}) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByNode', req, res, next);
};

// Memory usage (time series), by pod
metricsDataController.getMemoryUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes${namespaceString}) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByPod', req, res, next);
};

// Memory usage (time series), by namespace
metricsDataController.getMemoryUsageByNamespace = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes${namespaceString}) by (namespace)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByNamespace', req, res, next);
};

// Network IO received in bytes (time series), by node
metricsDataController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total${namespaceString}[${TIMESTEP}])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerNode', req, res, next);
};

// Network IO received in bytes (time series), by pod
metricsDataController.bytesReceivedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_receive_bytes_total${namespaceString}[${TIMESTEP}])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerPod', req, res, next);
};

// Network IO received in bytes (time series), by namespace
metricsDataController.bytesReceivedPerNamespace = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_receive_bytes_total${namespaceString}[${TIMESTEP}])) by (namespace)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerNamespace', req, res, next);
};

// Network IO transmitted in bytes (time series), by node
metricsDataController.bytesTransmittedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total${namespaceString}[${TIMESTEP}])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerNode', req, res, next);
};

// Network IO transmitted in bytes (time series), by pod
metricsDataController.bytesTransmittedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total${namespaceString}[${TIMESTEP}])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerPod', req, res, next);
};

// Network IO received in bytes (time series), by namespace
metricsDataController.bytesTransmittedPerNamespace = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace && namespace !== 'All')
    namespaceString = `{namespace="${namespace}"}`;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total${namespaceString}[${TIMESTEP}])) by (namespace)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerNamespace', req, res, next);
};

module.exports = metricsDataController;
