const pool = require('../config/database');

const createDriverProfile = async (req, res) => {
    try {
        const{
            vehicle_make,
            vehicle_model,
            vehicle_year,
            vehicle_color,
            plate_number,
            license_number,
        } = req.body;
        const user_id = req.user.id;
        const existing = await pool.query(
            'SELECT * FROM driver_profiles WHERE user_id = $1', [user_id]
        );
        if (existing.rows.length > 0) {
            const updated = await pool.query(
                `UPDATE driver_profiles SET vehicle_make = $1, vehicle_model = $2,
                 vehicle_year = $3,
                 vehicle_color = $4, plate_number = $5,
                  license_number = $6 WHERE user_id = $7 RETURNING *`,
                [vehicle_make, vehicle_model, vehicle_year, vehicle_color, plate_number,
                     license_number, user_id]
            );
            return res.json({ message: 'Driver profile updated successfully',
                 profile: updated.rows[0] });
        }
        const newProfile = await pool.query(
            `INSERT INTO driver_profiles (user_id, vehicle_make, vehicle_model,
             vehicle_year, vehicle_color, plate_number, license_number) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [user_id, vehicle_make, vehicle_model, vehicle_year, vehicle_color,
                 plate_number, license_number]
        );
        res.status(201).json({ message: 'Driver profile created successfully',
             profile: newProfile.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getDriverProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const profile = await pool.query(
            `SELECT dp.*, u.full_name, u.email, u.phone FROM driver_profiles dp
            JOIN users u ON dp.user_id = u.id WHERE dp.user_id = $1`, [user_id]
        );
        if (profile.rows.length === 0) {
            return res.status(404).json({ message: 'Driver profile not found' });
        }
        res.json({ profile: profile.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const rateDriver = async (req, res) => {
    try {
        const {ride_id, driver_id, rating, comment} = req.body;
        const rated_by = req.user.id;

        const ride = await pool.query('SELECT * FROM rides WHERE id = $1 AND status = $2', [ride_id,'completed']

        );
        if (ride.rows.length === 0) {
            return res.status(404).json({ message: 'Completed ride not found' });
        }
        const alreadyRated = await pool.query(
            'SELECT * FROM driver_ratings WHERE ride_id = $1 AND rated_by = $2',
            [ride_id, rated_by]
        );
        if (alreadyRated.rows.length > 0) {
            return res.status(400).json({ message: 'You have already rated this ride' });

        }
        await pool.query(
            `INSERT INTO driver_ratings (ride_id, rated_user, rating, comment, rated_by)
                VALUES ($1, $2, $3, $4, $5)`,
            [ride_id, driver_id, rating, comment, rated_by]
        );
        const avgRating = await pool.query(
            'SELECT AVG(rating) AS average_rating FROM ratings WHERE rated_user = $1', [driver_id]
        );
        await pool.query(
            'UPDATE driver_profiles SET rating = $1 WHERE user_id = $2',
            [avgRating.rows[0].average_rating, driver_id]
        );
        res.json({ message: 'Rating submitted successfully' });
    }
        catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createDriverProfile,
    getDriverProfile,
    rateDriver
};