const express = require('express');
const router = express.Router();
const { 
    createRide, 
    searchRides, 
    bookRide, 
    getRideDetails,
    getDriverRides } = require('../controllers/rideController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/create', createRide);
router.get('/search', searchRides);
router.post('/book', bookRide);
router.get('/:my-rides', getDriverRides);
router.get('/:id', getRideDetails);

module.exports = router;