import { SET_NAMESPACE } from '../actions/constants/actionTypes';

const initialState = {
  namespace: '',
};

const namespaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAMESPACE: {
      return { namespace: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default namespaceReducer;
