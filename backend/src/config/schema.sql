CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_role VARCHAR(20) DEFAULT 'passenger',
    profile_photo VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS driver_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_make VARCHAR(50),
    vehicle_model VARCHAR(50),
    vehicle_year INTEGER,
    vehicle_color VARCHAR(30),
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    license_photo VARCHAR(255),
    insurance_photo VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_rides INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES users(id),
    origin_address TEXT NOT NULL,
    origin_lat DECIMAL(10, 8) NOT NULL, 
    origin_lng DECIMAL(11, 8) NOT NULL,
    destination_address TEXT NOT NULL,
    destination_lat DECIMAL(10, 8) NOT NULL,
    destination_lng DECIMAL(11, 8) NOT NULL,
    total_fare DECIMAL(10, 2) NOT NULL,
    available_seats INT NOT NULL,
    booked_seats INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    departure_time TIMESTAMP ,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
    
    CREATE TABLE IF NOT EXISTS ride_passengers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID REFERENCES rides(id) ON DELETE CASCADE,
    passenger_id UUID REFERENCES users(id),
    fare_share DECIMAL(10, 2) ,
    status VARCHAR(20) DEFAULT 'pending',
    pickup_address TEXT,
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID REFERENCES rides(id) ,
    rated_by UUID REFERENCES users(id) ,
    rated_user UUID REFERENCES users(id) ,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
    );