import { combineReducers } from 'redux';
import nodesReducer from './nodes';
import podsReducer from './pods';

const reducers = combineReducers({
  nodes: nodesReducer,
  pods: podsReducer,
});

export default reducers;
