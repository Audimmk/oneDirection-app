const { Paynow } = require('paynow');
const pool = require('../config/database');

const paynow = new Paynow(process.env.PAYNOW_INTEGRATION_ID,
     process.env.PAYNOW_INTEGRATION_KEY);

     paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
        paynow.returnUrl = process.env.PAYNOW_RETURN_URL;
//initiate payment function
        const initiatePayment = async (req, res) => {
            try {
                const { ride_id, phone_number, method
                } = req.body;
                const passenger_id = req.user.id;

                const booking = await pool.query(
                    `SELECT rd.*, r.total_fare, r.booked_seats,
                   u.full_name, u.email
                   FROM ride_passengers rp
                   JOIN rides r ON rp.ride_id = r.id
                   JOIN users u ON rp.passenger_id = u.id
                   WHERE rp.ride_id = $1 AND rp.passenger_id = $2`,
                    [ride_id, passenger_id]
                );
                if (booking.rows.length === 0) {
                    return res.status(404).json({ error: 'Booking not found' });
                }
            
            
            const bookingData = booking.rows[0];
            const fare_share = parseFloat(bookingData.fare_share);

            const payment = paynow.createPayment(
                `Streym-Ride-${ride_id}`,
                bookingData.email
            );
            payment.add('Streym Ride Share', fare_share);

            const response = await paynow.sendMobile(payment,phone_number, method);

            if (response.success) {
                res.json({ message: 'Payment initiated successfully',
                     pollUrl: response.pollUrl,
                    instructions: response.instructions });
                } else {
                    res.status(400).json({ message: 'Payment initiation failed',
                        error: response.error
                     });
                }
             } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
            };
            const paymentResult = async (req, res) => {
                try {
                    const data = req.body;

                    if (data.status === 'Paid') {
                        await pool.query(
                            `UPDATE ride_passengers SET status = 'paid'
                            WHERE ride_id = $1 AND passenger_id = $2`,
                            [data.reference, data.paynowreference]

                        );
                    }
                    res.sendStatus(200);
                } 
                catch (error) 
                
                {console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
            };

            const checkPayment = async (req, res) => {
                try{
                    const {poll_url} = req.body;
                    const status =await paynow.pollTransaction(poll_url);
                    if (status.paid) {
                        res.json({
                            message: 'Payment successful',
                            status: 'paid'
                        });
                    } else {
                        res.json({
                            message: 'Payment pending',
                            status: 'pending'
                        });
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
            };

            module.exports = {
                initiatePayment,
                paymentResult,
                checkPayment
            };
        