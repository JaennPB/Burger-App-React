import * as actionTypes from '../actions/actionTypes';
import authReducer from './authReducer';

describe('authReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      idToken: null,
      userId: null,
      error: null,
      loading: false,
    };
  });

  it('should store token upon login', () => {
    expect(
      authReducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-token',
        userId: 'some-id',
      })
    ).toEqual({
      idToken: 'some-token',
      userId: 'some-id',
      error: null,
      loading: false,
    });
  });
});
