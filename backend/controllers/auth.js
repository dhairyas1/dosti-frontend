const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendmail = require("../utils/sendmail");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const customError = require("../utils/error");

var admin = require("firebase-admin");

var serviceAccount = require("../firebase/serviceAccountKey.json");
const { BACKEND_URL } = require("../config/backend-domain");
const RevokedToken = require("../models/RevokedToken");

// Get JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'dosti_secret_key_2023';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.signup = async (req, res, next) => {
  console.log('Signup request received:', {
    body: req.body,
    headers: req.headers,
    method: req.method
  });

  const { email, name, password, role, avatar, providerId, fbUserId } = req.body;
  console.log('Parsed signup data:', { email, name, role });

  try {
    // Basic validation
    if (!email || !password) {
      console.log('Validation error: missing email or password');
      const error = new customError("validation", "Email and password are required!");
      error.statusCode = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup error: email already exists');
      const error = new customError("email", "Email already exists!");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = {
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
      role: role || 'USER',
      avatar,
      providerId: providerId || "local",
    };

    if (fbUserId) {
      userData.fbUserId = fbUserId;
    }

    console.log('Creating new user with data:', { ...userData, password: '[HIDDEN]' });
    const newUser = new User(userData);
    const result = await newUser.save();
    console.log('User created successfully:', result._id);

    const token = jwt.sign(
      { email: result.email, userId: result._id.toString(), role: result.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully!",
      userId: result._id,
      token: token,
      role: result.role
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email });

  try {
    if (!email || !password) {
      console.log('Validation error: missing email or password');
      const error = new customError("validation", "Email and password are required!");
      error.statusCode = 422;
      throw error;
    }

    const userDoc = await User.findOne({ email, providerId: "local" });
    console.log('User found:', userDoc ? 'yes' : 'no');

    if (!userDoc) {
      console.log('Authentication failed: user not found');
      const error = new customError("auth", "Invalid email or password!");
      error.statusCode = 401;
      throw error;
    }

    const isMatched = await bcrypt.compare(password, userDoc.password);
    console.log('Password match:', isMatched ? 'yes' : 'no');
    
    if (!isMatched) {
      console.log('Authentication failed: password mismatch');
      const error = new customError("auth", "Invalid email or password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { 
        email: userDoc.email, 
        userId: userDoc._id.toString(),
        role: userDoc.role 
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Save token to database
    userDoc.loginToken = token;
    userDoc.loginTokenExpiration = Date.now() + 60 * 60 * 1000;
    await userDoc.save();

    console.log('Login successful for user:', userDoc.email);
    
    res.status(200).json({
      message: "Login successful!",
      token: token,
      userId: userDoc._id.toString(),
      role: userDoc.role
    });
  } catch (error) {
    console.error('Login error:', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  const tokenToRevoke = req.token;

  try {
    if (!tokenToRevoke) {
      const error = new customError("auth", "No token provided!");
      error.statusCode = 401;
      throw error;
    }

    // Add token to revoked tokens list
    const revokedToken = new RevokedToken({
      token: tokenToRevoke,
      revokedAt: new Date()
    });
    await revokedToken.save();

    // Clear user's login token
    const decoded = jwt.verify(tokenToRevoke, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      user.loginToken = null;
      user.loginTokenExpiration = null;
      await user.save();
    }

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
