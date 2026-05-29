const express = require('express');
const router = express.Router();
const { initiatePayment, paymentResult,checkPayment 

} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/result', paymentResult);
router.get('/return',(req, res) => {
    res.json({ message: 'Payment complete' });
});
router.post('/initiate', protect, initiatePayment);
router.post('/check',protect, checkPayment);
module.exports = router;