const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const upstoxRoutes = require('./routes/upstox');
const binanceRoutes = require("./routes/binanceRoutes");
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io'); // For WebSocket
const Binance = require('binance-api-node').default; // Binance API client
require('dotenv').config();

const app = express();
const server = http.createServer(app); // HTTP server for both express and WebSocket
const io = new Server(server, { cors: { origin: 'http://localhost:3000', credentials: true } }); // WebSocket server with CORS

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

const cspMiddleware = require('./middleware/csp');
app.use(cspMiddleware);

// Routes
app.use('/api', userRoutes);
app.use('/api/upstox', upstoxRoutes);
app.use('/api/binance', binanceRoutes);

// Connect to MongoDB
connectDB();

// Binance API and WebSocket integration
const binanceClient = Binance({
  apiKey: process.env.BINANCE_API_KEY, // Your Binance API key
  apiSecret: process.env.BINANCE_API_SECRET, // Your Binance secret
});

console.log(io.on('connection',(socket)=>{
    // console.log("SOCKET",socket)
}))

io.on('connection', (socket) => {

    
  console.log('New WebSocket connection established');

  // Listen to Binance Kline (candlestick) data
  binanceClient.ws.candles('SOLUSDT', '1h', candle => {
    const klineData = {
      time: Math.round(candle.startTime / 1000),
      open: parseFloat(candle.open),
      high: parseFloat(candle.high),
      low: parseFloat(candle.low),
      close: parseFloat(candle.close),
      volume: parseFloat(candle.volume),
    };
    // console.log("KLINE",klineData)
    // Emit the data to the connected WebSocket clients
    io.emit('KLINE', klineData);
  });
  

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed');
  });
});

// Start the server
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
