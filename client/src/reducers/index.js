import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Example reducer
import dataReducer from './historicalDataReducers';
// import { chartReducer } from './chartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  data:dataReducer,
  // chart: chartReducer,
  // add other reducers here
});

export default rootReducer;
