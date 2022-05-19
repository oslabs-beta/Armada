import { FETCH_DEPLOYMENTS_LIST } from '../actions/constants/actionTypes';

const initialState = {
  items: [],
  lastUpdated: null,
};

const deploymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPLOYMENTS_LIST: {
      return { items: action.payload, lastUpdated: new Date().toISOString() };
    }
    default: {
      return state;
    }
  }
};

export default deploymentsReducer;
