// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import rootReducer from '../reducers/index';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import chartSlice from "../slices/chartSlice";
import authSlice from "../slices/authSlice";
import upstoxChartSlice from "../slices/upstoxChartSlice";
import optionChainSlice from "../slices/optionChainSlice";
import upstoxAuthSlice from "../slices/upstoxAuthSlice";    
import upstoxConnection from "../slices/upstoxConnection";
const store = configureStore({
    devTools:true,
    reducer: {
        chart: chartSlice,
        authSlice,
        upstoxChartSlice,
        optionChainSlice,
        upstoxAuthSlice,
        upstoxConnection

    }
})

export default store