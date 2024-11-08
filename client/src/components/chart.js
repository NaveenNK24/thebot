import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../slices/chartSlice';
import { createChart, CrosshairMode, LineStyle, LineType } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

const ChartComponent1 = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const { data = [], loading, error } = useSelector((state) => state.chart);

  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const histogramSeriesRef = useRef(null);
  const socketRef = useRef(null);

  const [showSMA, setShowSMA] = useState(true);
  const [smaPeriod, setSmaPeriod] = useState(10); // Default SMA period

  useEffect(() => {
    if (symbol && smaPeriod) {
      dispatch(fetchData({ symbol, smaPeriod })); // Pass SMA period to fetchData
    }
  }, [dispatch, symbol, smaPeriod]);


  useEffect(() => {
    if (!data.length) return;


    // Create chart if not already created
    if (!chartRef.current) {
      const domElement = document.getElementById('tvchart');

      chartRef.current = createChart(domElement, {
        timeScale: { 
          timeVisible: true, 
          secondsVisible: true,
          borderVisible: true,  
        },
        grid: {
          vertLines: {
            color: 'transparent',
          },
          horzLines: {
            color: '#f0f3fa',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal, 
          vertLine: {
            width: 1,
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
          horzLine: {
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
        },
      });

      candleSeriesRef.current = chartRef.current.addCandlestickSeries();

      candleSeriesRef.current.applyOptions({
        wickUpColor: "#089981",
        upColor: "#089981",
        wickDownColor: "#000000",
        downColor: "#000000",
        borderVisible: false,
      });
      // histogramSeriesRef.current = chartRef.current.addHistogramSeries({ color: 'red' });
    }

    candleSeriesRef.current.setData(data);


    histogramSeriesRef.current = chartRef.current.addHistogramSeries({
      // color: '#26a69a',
      priceFormat: {
          type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
      // set the positioning of the volume series
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
      },
  });
  histogramSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
      },
  });
    const histogramData = data.map(d => ({ time: d.time, value: d.volume, color: d.open>d.close?"#fd4040":"#089981" }));
     histogramSeriesRef.current.setData(histogramData);

    // Function to create and plot a line series for any given data
    const plotLineSeries = (color, lineWidth, lineStyle, filterKey, priceLineVisible,lineType) => {
      const series = chartRef.current.addLineSeries({ color, lineWidth, lineStyle, priceLineVisible ,lineType});
      const seriesData = data.filter(d => d[filterKey]).map(d => ({ time: d.time, value: d[filterKey] }));
      series.setData(seriesData);
    };

   
    

    // Plot all pivot points, support, and resistance levels
    // plotLineSeries('blue', 1.5, LineStyle.Solid, 'pivot', false); 
    // plotLineSeries('blue', 1.5, LineStyle.Solid, 'toppivot', false); 
    // plotLineSeries('blue', 1.5, LineStyle.Solid, 'bottompivot', false); 

    // plotLineSeries('green', 0.5, LineStyle.Solid, 'r1', false); 
    // plotLineSeries('green', 0.5, LineStyle.Solid, 'r2', false); 
    // plotLineSeries('green', 0.5, LineStyle.Solid, 'r3', false); 
    // plotLineSeries('green', 0.5, LineStyle.Solid, 'r4', false); 

    // plotLineSeries('red', 0.5, LineStyle.Solid, 's1', false); 
    // plotLineSeries('red', 0.5, LineStyle.Solid, 's2', false); 
    // plotLineSeries('red', 0.5, LineStyle.Solid, 's3', false); 
    // plotLineSeries('red', 0.5, LineStyle.Solid, 's4', false); 

    plotLineSeries('green', 1, LineStyle.Solid, 'ema1', false); 
    plotLineSeries('red', 1, LineStyle.Solid, 'ema2', false); 
    plotLineSeries('violet', 2, LineStyle.Solid, 'sma1', false); 

    // plotLineSeries('red', 1.5, LineStyle.LargeDashed, 'vah', false, LineType.Simple); 
    // plotLineSeries('red', 1.5, LineStyle.LargeDashed, 'val', false,LineType.WithSteps); 
    // plotLineSeries('black', 1.5, LineStyle.LargeDashed, 'poc', false,LineType.WithSteps); 

    // Combine markers into a single setMarkers call
    const markers = data
      .flatMap(d => [
        d.longBuy ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'LB',
        } : null,
        d.longSell ? {
          time: d.time,
          position: 'aboveBar',
          color: d.buySellDifference >= 0 ? 'violet' : 'red',
          shape: 'arrowDown',
          text: `LS ${d.buySellDifference != null ? d.buySellDifference.toFixed(2) : 'N/A'}`,
        } : null,
        d.shortBuy ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'SB',
        } : null,
        d.shortSell ? {
          time: d.time,
          position: 'aboveBar',
          color: d.buyshortSellDifference >= 0 ? 'Brown' : 'Black',
          shape: 'arrowDown',
          text: `SS ${d.buyshortSellDifference != null ? d.buyshortSellDifference.toFixed(2) : 'N/A'}`,
        } : null,
        d.WRSignal === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'WR L',
        } : d.WRSignal === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'WR S',
        } : null,
        d.ERSignal === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'ER L',
        } : d.ERSignal === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'ER S',
        } : null,
        d.doji === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'D L',
        } : d.doji === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'D S',
        } : null
      ])
      .filter(Boolean);

    candleSeriesRef.current.setMarkers(markers);

    // Crosshair move handler
    const myCrosshairMoveHandler = (param) => {
      if (!param.point) return;

      // console.log(`Crosshair moved to ${param.point.x}, ${param.point.y}. The time is ${param.time}.`);
       const firstEntry = param.seriesData.entries().next().value

       if(firstEntry) {
            // Access open, high, close from the value object
            const [key, value] = firstEntry;
            const Vopen = value.open;
            const Vhigh = value.high;
            const Vclose = value.close;
            const Vlow = value.low
              console.log(Vopen,Vhigh,Vlow,Vclose);
       }


    };

    socketRef.current = io("http://localhost:5005", {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected with ID: ", socketRef.current.id);
      // setSocketConnected(true); // Update the connection status
    });

    // socketRef.current.on("KLINE", (data) => {
      console.log("Received KLINE data: ", data);

    //   // setKlineData(data); // Update the state with KLINE data
    // });

    socketRef.current.on('KLINE', (pl) => {
      const newCandle = {
        time: pl.time,
        open: pl.open,
        high: pl.high,
        low: pl.low,
        close: pl.close,
      };

      console.log(newCandle)

      // Update the chart with the new candlestick data
      // candleSeriesRef.current.update(newCandle);

      // const oldestTime = candleSeriesRef.current.data[0]?.time;
      // if (newCandle.time <= oldestTime) {
      //   // Remove the oldest data point and add the new one
      //   candleSeriesRef.current.setData(candleSeriesRef.current.data.slice(1).concat(newCandle));
      // } else {
      //   candleSeriesRef.current.update(newCandle);
      // }

      // const newHistogram = {
      //   time: pl.time,
      //   value: pl.volume,
      //   color: pl.open > pl.close ? "#fd4040" : "#089981"
      // };

      // histogramSeriesRef.current.update(newHistogram); // Update the histogram with new volume data
    });

    // Subscribe to crosshair move
    chartRef.current.subscribeCrosshairMove(myCrosshairMoveHandler);

    // Unsubscribe from crosshair move on cleanup
    return () => {
      socketRef.current.disconnect(); 
      if (chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(myCrosshairMoveHandler);
      }
    };


    

  }, [data, showSMA]);



  
  const toggleSMA = () => setShowSMA(prev => !prev);

  const handlePeriodChange = (e) => {
    setSmaPeriod(Number(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <button onClick={toggleSMA}>
        {showSMA ? 'Hide SMA' : 'Show SMA'}
      </button>
      <input
        type="number"
        value={smaPeriod}
        onChange={handlePeriodChange}
        min="1"
        style={{ marginLeft: '10px' }}
      /> */}
      <div id="tvchart" style={{ height: '700px' }}></div>
    </div>
  );
};

export default ChartComponent1;
