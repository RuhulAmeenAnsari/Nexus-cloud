const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CloudGamingDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'ruhulansari7786@gmail.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            email: 'ruhulansari7786@gmail.com',
            name: 'Ruhul Ameen',
            password: 'Ruhul@cloud123',
            role: 'admin'
        });

        console.log('Admin account created successfully:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin account:', error);
        process.exit(1);
    }
};

createAdmin(); 