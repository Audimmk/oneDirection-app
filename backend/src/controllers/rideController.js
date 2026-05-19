const pool = require('../config/database');

const createRide = async (req, res) => {
    try {
        const { 
            origin_address,
            origin_lat,
            origin_lng,
            destination_address,
            destination_lat,
            destination_lng,
            total_fare,
            available_seats,
            departure_time
         } = req.body;
        const driver_id = req.user.id;

        const newRide = await pool.query(
            `INSERT INTO rides (driver_id, origin_address, origin_lat, origin_lng,
             destination_address, destination_lat, destination_lng,
              total_fare, available_seats, departure_time) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [driver_id, origin_address, origin_lat, origin_lng,
                 destination_address, destination_lat, destination_lng, total_fare,
                  available_seats, departure_time]
        );
        res.status(201).json({ message: 'Ride created successfully',
             ride: newRide.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const searchRides = async (req, res) => {
    try {
        const rides = await pool.query(
            `SELECT r.*, u.full_name AS driver_name, u.phone AS driver_phone,
            u.phone as driver_phone, 
            dp.vehicle_make, dp.vehicle_model, dp.vehicle_color, dp.plate_number, dp.rating
                FROM rides r
                JOIN users u ON r.driver_id = u.id
                LEFT JOIN driver_profiles dp ON r.driver_id = dp.user_id
                WHERE r.status = 'pending'
                AND r.available_seats > r.booked_seats
                ORDER BY r.departure_time ASC`
        );
        res.status(200).json({ rides: rides.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }};
    const bookRide = async (req, res) => {
        try {
            const {ride_id,pickup_address, pickup_lat, pickup_lng} = req.body;
            const passenger_id = req.user.id;

            const ride = await pool.query('SELECT * FROM rides WHERE id = $1', [ride_id]);
            if (ride.rows.length === 0) {
                return res.status(404).json({ message: 'Ride not found' });
            }
            const rideData = ride.rows[0];
            if (parseInt(rideData.booked_seats)>= parseInt(rideData.available_seats)) {
            }
            const alreadyBooked = await pool.query(
                'SELECT * FROM ride_passengers WHERE ride_id = $1 AND passenger_id = $2',
                [ride_id, passenger_id]
            );
            if (alreadyBooked.rows.length > 0) {
                return res.status(400).json({ message: 'Already booked this ride' });
            }
            const totalPassengers = rideData.booked_seats + 1;
             const fare_share = (rideData.total_fare / totalPassengers).toFixed(2);

             const booking = await pool.query(
                `INSERT INTO ride_passengers (ride_id, passenger_id, fare_share, pickup_address,
                 pickup_lat, pickup_lng, status)
                 VALUES ($1,$2,$3,$4,$5,$6, 'confirmed') RETURNING *`,
                [ride_id, passenger_id, fare_share, pickup_address, pickup_lat, pickup_lng]
            );
            await pool.query(
                'UPDATE rides SET booked_seats = booked_seats + 1 WHERE id = $1',
                [ride_id]
            );
            res.status(201).json({ message: 'Ride booked successfully',
                 booking: booking.rows[0],fare_share: fare_share});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });

        }
    };


        const getRideDetails = async (req, res) => {
            try {
                const {id} = req.params;
                const ride = await pool.query(
                    `SELECT r.*, u.full_name AS driver_name, u.phone AS driver_phone,
                    dp.vehicle_make, dp.vehicle_model, dp.vehicle_color, dp.plate_number, dp.rating 
                     FROM rides r
                     JOIN users u ON r.driver_id = u.id
                     LEFT JOIN driver_profiles dp ON r.driver_id = dp.user_id
                     WHERE r.id = $1`, [id]
                );
                res.json({ ride: ride.rows[0],
                    passengers: passengers.rows
                 });           
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        };
        const getDriverRides = async (req, res) => {
            try {
                const driver_id = req.user.id;
                const rides = await pool.query(
                    'SELECT * FROM rides WHERE driver_id = $1 ORDER BY created_at DESC',
                    [driver_id]
                );
                res.json({ rides: rides.rows });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        };
        module.exports = {
            createRide,
            searchRides,
            bookRide,
            getRideDetails,
            getDriverRides
        };