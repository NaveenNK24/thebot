import React, {  useEffect } from 'react';
// import { chartReducer, initialState } from '../reducers/chartReducer.js';
import { fetchData } from '../actions/chartAction.js';
import { createChart } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ChartComponent1 = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams(); 
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (symbol) {
        dispatch(fetchData(symbol));
    }
}, [dispatch, symbol]);

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

      const sma_series = chart.addLineSeries({ color: 'red', lineWidth: 1 });
        const sma_data = data
        .filter((d) => d.sma)
        .map((d) => ({ time: d.time, value: d.sma }));
        sma_series.setData(sma_data);


    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div id="tvchart" style={{ height: '700px' }}></div>;
};

export default ChartComponent1;
