const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const upstoxRoutes = require('./routes/upstox');
const binanceRoutes = require("./routes/binanceRoutes")
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


const cspMiddleware = require('./middleware/csp');
app.use(cspMiddleware);

// Routes
app.use('/api', userRoutes);
app.use('/api/upstox', upstoxRoutes);
app.use('/api/binance', binanceRoutes);
// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
