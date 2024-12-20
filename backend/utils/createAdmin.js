const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'dhairya.sibal1@gmail.com' });
    
    if (existingAdmin) {
      // Update role to ADMIN if it's not
      if (existingAdmin.role !== 'ADMIN') {
        existingAdmin.role = 'ADMIN';
        await existingAdmin.save();
        console.log('Updated user to ADMIN role');
      }
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Dhairya1212', 12);

    // Create admin user with ADMIN role
    const adminUser = new User({
      email: 'dhairya.sibal1@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User'
    });

    await adminUser.save();
    console.log('Admin user created successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
