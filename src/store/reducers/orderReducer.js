import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initalState = {
  orders: [],
  loading: false,
  purchased: true,
};

const orderReducer = (state = initalState, actions) => {
  switch (actions.type) {
    // ====================================================== SEND ORDER
    case actionTypes.ORDER_START_REDIRECT:
      return updateState(state, { purchased: false });
    case actionTypes.ORDER_LOADING:
      return updateState(state, { loading: true });
    case actionTypes.ORDER_SUBMIT:
      return updateState(state, { loading: false, purchased: true });
    case actionTypes.ORDER_ERROR:
      return updateState(state, { loading: false });
    // ====================================================== GET ORDERS
    case actionTypes.GET_ORDER_LOADING:
      return updateState(state, { loading: true });
    case actionTypes.GET_ORDER_SUCCESS:
      return updateState(state, { orders: actions.orders, loading: false });
    case actionTypes.GET_ORDER_ERROR:
      return updateState(state, { loading: false });
  }
  return state;
};

export default orderReducer;
