import { FETCH_NODES_LIST } from '../actions/constants/actionTypes';

const initialState = {
  items: [],
  lastUpdated: null,
};

const nodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NODES_LIST: {
      return { items: action.payload, lastUpdated: new Date().toISOString() };
    }
    default: {
      return state;
    }
  }
};

export default nodesReducer;
