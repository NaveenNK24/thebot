// actions/authActions.js
import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  console.log(userData)
  try {
    const res = await axios.post('http://localhost:5005/api/signup', userData,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res.data,"success");
    dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
  }
};

export const login = (userData) => async (dispatch) => {
  // console.log(userData)
  try {
    const res = await axios.post('http://localhost:5005/api/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res.data,"success");
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};
