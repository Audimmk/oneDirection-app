const { get } = require('../..');
const pool = require('../config/database');
const { getIO } = require('../config/socket');

const updateRideStatus = async (req, res) => {
    try {
        const { ride_id, status } = req.body;
        const driver_id = req.driver.id;

        const ride = await pool.query('SELECT * FROM rides WHERE id = $1 AND driver_id=$2',
             [ride_id, driver_id]);
        if (ride.rows.length === 0) {
            return res.status(404).json({ message: 'Ride not found or unauthorized' });

        }
        await pool.query('UPDATE rides SET status = $1, updated_at = NOW() WHERE id = $2', [status, ride_id]);

        const io = getIO();
        io.to(`ride_${ride_id}`).emit('ride_status', { status, message: getStatusMessage(status) }); 
        res.json({ message: 'Ride status updated ',status });
    } catch (error) {
        console.error (error);
        res.status(500).json({message:'Server error'});
    }
};
const updateLocation = async (req, res) => {
    try {
        const { ride_id, latitude, longitude } = req.body;
        const driver_id = req.driver.id;

        const io = getIO();
        io.to(`ride_${ride_id}`).emit('driver_location', {
            driver_id,
            latitude,
            longitude,
            timestamp: new Date()

        });
        res.json({ message: 'Location updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getStatusMessage = (status) => {
    const messages = {
        'active':'Your ride is starting!',
        'arriving':'Your driver is arriving!',
        'started':'Your ride has started!',
        'completed':'You have arrived at your destination!'
    };
    return messages[status] || 'Ride status updated';
};
module.exports = {
    updateRideStatus,
    updateLocation
};