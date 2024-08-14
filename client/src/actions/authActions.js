// actions/authActions.js
import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};
