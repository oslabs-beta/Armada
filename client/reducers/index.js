import { combineReducers } from 'redux';
import namespaceReducer from './namespace';
import nodesReducer from './nodes';
import podsReducer from './pods';

const reducers = combineReducers({
  nodes: nodesReducer,
  pods: podsReducer,
  namespace: namespaceReducer,
});

export default reducers;
