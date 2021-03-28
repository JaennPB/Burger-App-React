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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
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

export const asyncAuthentication = (email, password, signedUp) => {
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
      // dispatch actions
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(asyncSetTimerLogout(res.data.expiresIn));
      // set local storage
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
      console.log(expirationDate);
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('localId', res.data.localId);
    } catch (err) {
      console.log(err.response);
      dispatch(authError(err.response.data.error));
    }
  };
};

// get data from local storage

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const localId = localStorage.getItem('localId');

    if (!token) {
      dispatch(authLogout());
      return;
    }

    if (expirationDate <= new Date()) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token, localId));
      dispatch(asyncSetTimerLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  };
};
