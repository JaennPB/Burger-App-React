import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initalState = {
  orders: [],
  loading: false,
  purchased: true,
};

const submitOrderReducer = (state = initalState, actions) => {
  switch (actions.type) {
    case actionTypes.ORDER_START_REDIRECT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.ORDER_LOADING:
      return updateState(state, { loading: true });
    case actionTypes.ORDER_SUBMIT:
      const newOrder = { ...actions.orderData, id: actions.orderId };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({ newOrder }),
      };
    case actionTypes.ORDER_ERROR:
      return {
        ...state,
        loading: false,
      };
  }
  return state;
};

export default submitOrderReducer;
