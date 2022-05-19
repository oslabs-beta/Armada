import { FETCH_PROM_METRICS } from '../actions/constants/actionTypes';

const initialState = {
  items: [],
  lastUpdated: null,
};

const promMetricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROM_METRICS: {
      return { items: action.payload, lastUpdated: new Date().toISOString() };
    }
    default: {
      return state;
    }
  }
};

export default promMetricsReducer;
