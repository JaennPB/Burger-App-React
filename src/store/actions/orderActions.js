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

const orderSubmit = () => {
  return {
    type: actionTypes.ORDER_SUBMIT,
  };
};

const orderError = () => {
  return {
    type: actionTypes.ORDER_ERROR,
  };
};

export const asyncOrderStart = (orderData, token) => {
  return async (dispatch) => {
    dispatch(orderLoading());
    try {
      await axios.post(`/orders.json?auth=${token}`, orderData);
      dispatch(orderSubmit());
    } catch {
      dispatch(orderError());
    }
  };
};

// ============================================================ GET ORDER

const getOrderLoading = () => {
  return {
    type: actionTypes.GET_ORDER_LOADING,
  };
};

const getOrderSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.GET_ORDER_SUCCESS,
    orders: fetchedOrders,
  };
};

const getOrderError = () => {
  return {
    type: actionTypes.GET_ORDER_ERROR,
  };
};

export const asyncGetOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(getOrderLoading());
    try {
      const res = await axios.get(`/orders.json`, {
        params: {
          auth: token,
          orderBy: `"userId"`,
          equalTo: `"${userId}"`,
        },
      });
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], key: key });
      }
      dispatch(getOrderSuccess(fetchedOrders));
    } catch {
      dispatch(getOrderError());
    }
  };
};
