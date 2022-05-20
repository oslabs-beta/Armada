import {
  FETCH_NODES_LIST,
  FETCH_PODS_LIST,
  SET_NAMESPACE,
  FETCH_DEPLOYMENTS_LIST,
  FETCH_NAMESPACES_LIST,
  FETCH_SERVICES_LIST,
  FETCH_PROM_METRICS,
} from './constants/actionTypes';

export const first = (payload) => ({
  type: second,
  payload,
});

export const fetchNodesList = (payload) => ({
  type: FETCH_NODES_LIST,
  payload,
});

export const fetchPodsList = (payload) => ({
  type: FETCH_PODS_LIST,
  payload,
});

export const setNamespace = (payload) => ({
  type: SET_NAMESPACE,
  payload,
});

export const fetchNamespacesList = (payload) => ({
  type: FETCH_NAMESPACES_LIST,
  payload,
});

export const fetchServicesList = (payload) => ({
  type: FETCH_SERVICES_LIST,
  payload,
});

export const fetchDeploymentsList = (payload) => ({
  type: FETCH_DEPLOYMENTS_LIST,
  payload,
});

export const fetchPromMetrics = (payload) => ({
  type: FETCH_PROM_METRICS,
  payload,
});
