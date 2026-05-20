const express = require('express');
const router = express.Router();
const { createDriverProfile,
     getDriverProfile,
     rateDriver } = require('../controllers/driverController');
const { protect,
    driverOnly }
 = require('../middleware/authMiddleware');
 router.use(protect);
 router.post('/profile', driverOnly, createDriverProfile);
router.get('/profile', driverOnly, getDriverProfile);
router.post('/rate', rateDriver);

module.exports = router;