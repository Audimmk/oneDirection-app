const express = require('express');
const router = express.Router();
const { updateRideStatus, updateLocation } = require('../controllers/trackingController');
const {
    protect,
    driverOnly
} = require('../middleware/authMiddleware');

router.use(protect);

router.post ('/status', driverOnly, updateRideStatus);
router.post('/location', driverOnly, updateLocation);
module.exports = router;