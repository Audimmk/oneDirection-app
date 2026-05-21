const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('driver_join', (driver_id) => {
            socket.join(`driver_${driver_id}`);
            console.log(`Driver ${driver_id} joined their room driver`);
        });

        socket.on('passenger_join', (ride_id) => {
            socket.join(`ride_${ride_id}`);
            console.log(`Passenger joined ride room ${ride_id}`);
        });
        socket.on('update_location',(data) => {
            const {driver_id,ride_id,latitude,longitude} = data;
            io.to(`ride_${ride_id}`).emit('driver_location', 
                {
                    driver_id,
                    latitude,
                    longitude,
                    timestamp: new Date()                }
            );
        });

        socket.on('ride_started',(ride_id) => {
            io.to(`ride_${ride_id}`).emit('ride_status', {status: 'started',
                message: 'Your ride has started!'
            });
        });
        socket.on('ride_completed',(ride_id) => {
            io.to(`ride_${ride_id}`).emit('ride_status', {status: 'completed',
                message: 'You have arrived at your destination!'
            });
        });
        socket.on('driver_arriving', (ride_id) => {
            io.to(`ride_${ride_id}`).emit('ride_status', {status: 'arriving',
                message: 'Your driver is arriving!'
            });
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
};


const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
module.exports = {
    initSocket,
    getIO
};