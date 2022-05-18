import {
  FETCH_NODES_LIST,
  FETCH_PODS_LIST,
  SET_NAMESPACE,
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
