import { combineReducers } from 'redux';
import namespaceReducer from './namespace';
import nodesReducer from './nodes';
import podsReducer from './pods';
import deploymentsReducer from './deployments';
import servicesReducer from './services';
import promMetricsReducer from './promMetrics';

const reducers = combineReducers({
  nodes: nodesReducer,
  pods: podsReducer,
  namespace: namespaceReducer,
  deployments: deploymentsReducer,
  services: servicesReducer,
  promMetrics: promMetricsReducer,
});

export default reducers;
