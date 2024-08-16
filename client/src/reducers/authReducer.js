// reducers/authReducer.js
const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    error: null
  };
  

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          error: null,
          successMessage: 'Signup successful!',
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          error: null,
          successMessage: 'Login successful!',
        };
      case 'SIGNUP_FAIL':
        return {
          ...state,
          error: action.payload.message || 'Signup failed',
          isAuthenticated: false,
          successMessage: null,
        };
      case 'LOGIN_FAIL':
        return {
          ...state,
          error: action.payload.message || 'Authentication failed.',
          isAuthenticated: false,
          successMessage: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  