import { FETCH_PODS_LIST } from '../actions/constants/actionTypes';

const initialState = {
  items: [],
  lastUpdated: null,
};

const podsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PODS_LIST: {
      return { items: action.payload, lastUpdated: new Date().toISOString() };
    }
    default: {
      return state;
    }
  }
};

export default podsReducer;
