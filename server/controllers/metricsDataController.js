const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { spawn } = require('child_process');
const metricsFetch = require('../utils/metricsFetch');
// can use to run specified commands that you'd otherwise need to write in terminal

const prometheusURL = 'http://127.0.0.1:9090/api/v1/';

const metricsDataController = {};

// CPU usage time series data, by Node
metricsDataController.getCPUUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step, namespace } = req.query;
  let namespaceString = '';
  if (namespace) namespaceString = `{namespace="${namespace}"}`;
  //sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{cluster="$cluster", namespace="$namespace"}) by (node)
  // let query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (node) &start=2022-05-13T17:52:43.841Z&end=2022-05-14T21:52:43.841Z&step=30m`;
  // let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace!=""}[2m])) by (node)`;
  // let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (node)`;
  // let query = `${prometheusURL}query?query=100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[10m]) * 100) * on(instance) group_left(nodename) (node_uname_info))`;

  // from the article:
  // for by node utilization:
  // let query = `${prometheusURL}query_range?query=sum(rate(container_cpu_usage_seconds_total{container_name!="POD",pod_name!=""}[5m])) by (node)`;
  // for namespace CPU utilization:
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate${namespaceString}) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNode', req, res, next);
};

metricsDataController.getCPUUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByPod', req, res, next);
};

metricsDataController.getCPUUsageByNamespace = async (req, res, next) => {
  const namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="${namespace}"})`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getCPUUsageByNamespace', req, res, next);
};

// Memory Usage By Node (TBU change to Namespace)
metricsDataController.getMemoryUsageByNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByNode', req, res, next);
};

metricsDataController.getMemoryUsageByPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByPod', req, res, next);
};

metricsDataController.getMemoryUsageByNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(container_memory_working_set_bytes{job="kubelet", metrics_path="/metrics/cadvisor", namespace="${namespace}", container!="", image!=""})`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'getMemoryUsageByNamespace', req, res, next);
};

// Bytes Received Per Node (TBU change to Namespace)
metricsDataController.bytesReceivedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerNode', req, res, next);
};

metricsDataController.bytesReceivedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerPod', req, res, next);
};

metricsDataController.bytesReceivedPerNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_receive_bytes_total{namespace="${namespace}"}[5m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesReceivedPerNamespace', req, res, next);
};

metricsDataController.bytesTransmittedPerNode = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (node)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerNode', req, res, next);
};

metricsDataController.bytesTransmittedPerPod = async (req, res, next) => {
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total[2m])) by (pod)`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerPod', req, res, next);
};

metricsDataController.bytesTransmittedPerNamespace = async (req, res, next) => {
  let namespace = 'monitoring';
  const { startDateTime, endDateTime, step } = req.query;
  let query = `${prometheusURL}query_range?query=sum(irate(container_network_transmit_bytes_total{namespace="${namespace}"}[5m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  metricsFetch(query, 'bytesTransmittedPerNamespace', req, res, next);
};

module.exports = metricsDataController;
