const express = require('express');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const rideRoutes = require('./src/routes/rideRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const trackingRoutes = require('./src/routes/trackingRoutes');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const pool = require('./src/config/database');
const redisClient = require('./src/config/redis');
const { initSocket } = require('./src/config/socket');

const server = http.createServer();
const io = initSocket(server);

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL connection error', err);
  } else {
    console.log(' Connected to PostgreSQL database:', res.rows[0].now);
    }
});
app.use('/api/auth',authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/tracking', trackingRoutes);
app.get('/', (req, res) => {
res.json({message:'RideShare API is running!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
module.exports = app;