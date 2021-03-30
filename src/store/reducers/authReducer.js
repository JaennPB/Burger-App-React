import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  // username: '',
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_LOADING:
      return updateState(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateState(state, {
        idToken: actions.idToken,
        userId: actions.userId,
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateState(state, { idToken: null, userId: null });
    case actionTypes.AUTH_ERROR:
      return updateState(state, { error: actions.error, loading: false });
    // case actionTypes.AUTH_GET_USERNAME:
    //   return updateState(state, { username: actions.username });
  }
  return state;
};

export default authReducer;
