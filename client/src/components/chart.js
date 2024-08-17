import React, { useReducer, useEffect, useRef } from 'react';
// import { chartReducer, initialState } from '../reducers/chartReducer.js';
import { fetchData } from '../actions/chartAction.js';
import { createChart } from 'lightweight-charts';


import { useDispatch, useSelector } from 'react-redux';
// import { fetchData } from './actions';
// import { createChart } from 'lightweight-charts';

const ChartComponent1 = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const chartProperties = {
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      };

      const domElement = document.getElementById('tvchart');
      const chart = createChart(domElement, chartProperties);
      const candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div id="tvchart" style={{ height: '700px' }}></div>;
};

export default ChartComponent1;
