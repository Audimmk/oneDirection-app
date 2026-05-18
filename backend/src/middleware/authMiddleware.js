const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
const driverOnly = (req, res, next) => {
    if (req.user && req.user.role === 'driver') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, drivers only' });
    }
};
const passengerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'passenger') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, passengers only' });
    }
};  
module.exports = { protect, driverOnly, passengerOnly };