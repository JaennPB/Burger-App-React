import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderStartRedirect = () => {
  return {
    type: actionTypes.ORDER_START_REDIRECT,
  };
};

const orderLoading = () => {
  return {
    type: actionTypes.ORDER_LOADING,
  };
};

const orderSubmit = (id, data) => {
  return {
    type: actionTypes.ORDER_SUBMIT,
    orderId: id,
    orderData: data,
  };
};

const orderError = (error) => {
  return {
    type: actionTypes.ORDER_ERROR,
    error: error,
  };
};

export const asyncOrderStart = (orderData) => {
  return async (dispatch) => {
    dispatch(orderLoading());
    try {
      await axios.post('/orders.json', orderData).then((res) => {
        console.log(res);
        dispatch(orderSubmit(res.data.name, orderData));
      });
    } catch (err) {
      dispatch(orderError(err));
    }
  };
};
