import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Example reducer

const rootReducer = combineReducers({
  auth: authReducer
  // add other reducers here
});

export default rootReducer;
