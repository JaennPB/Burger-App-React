import axios from 'axios';

import * as actionTypes from './actionTypes';

const authLoading = () => {
  return {
    type: actionTypes.AUTH_LOADING,
  };
};

const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: id,
  };
};

const authError = (err) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: err,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const asyncSetTimerLogout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const asyncAuthentication = (email, password, signedUp, redirect) => {
  return async (dispatch) => {
    dispatch(authLoading());

    const key = 'AIzaSyA0B4Mz4kWb8wRMloEYZgsfhKgK4khmvFk';
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url;
    if (signedUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }

    try {
      const res = await axios.post(`${url}${key}`, authData);
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(asyncSetTimerLogout(res.data.expiresIn));
      redirect.replace('/orders');
    } catch (err) {
      //   console.log(err);
      dispatch(authError(err.response.data.error));
    }
  };
};
