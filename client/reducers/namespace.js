import {
  FETCH_NAMESPACES_LIST,
  SET_NAMESPACE,
} from '../actions/constants/actionTypes';

const initialState = {
  selectedNamespace: '',
  namespacesList: [],
};

const namespaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAMESPACE: {
      return { ...state, selectedNamespace: action.payload };
    }
    case FETCH_NAMESPACES_LIST: {
      return { ...state, namespacesList: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default namespaceReducer;
