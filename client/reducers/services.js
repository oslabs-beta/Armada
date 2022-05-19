import { FETCH_SERVICES_LIST } from '../actions/constants/actionTypes';

const initialState = {
  items: [],
  lastUpdated: null,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_LIST: {
      return { items: action.payload, lastUpdated: new Date().toISOString() };
    }
    default: {
      return state;
    }
  }
};

export default servicesReducer;
