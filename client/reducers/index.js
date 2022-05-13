import { combineReducers } from 'redux';
import nodesReducer from './nodes';

const reducers = combineReducers({
  nodes: nodesReducer,
});

export default reducers;
