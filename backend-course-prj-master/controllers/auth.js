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
  const { email, name, password, role, avatar, providerId, fbUserId } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      const error = new customError("validation", "Email and password are required!");
      error.statusCode = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new customError("email", "Email already exists!");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = {
      email,
      name,
      password: hashedPassword,
      role: role || 'USER',
      avatar,
      providerId: providerId || "local",
    };

    if (fbUserId) {
      userData.fbUserId = fbUserId;
    }

    const newUser = new User(userData);
    const result = await newUser.save();

    // Create token for immediate login
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = new customError("validation", "Email and password are required!");
      error.statusCode = 422;
      throw error;
    }

    const userDoc = await User.findOne({ email, providerId: "local" });

    if (!userDoc) {
      const error = new customError("auth", "Invalid email or password!");
      error.statusCode = 401;
      throw error;
    }

    const isMatched = await bcrypt.compare(password, userDoc.password);
    if (!isMatched) {
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

    res.status(200).json({
      message: "Login successful!",
      token: token,
      userId: userDoc._id.toString(),
      role: userDoc.role
    });
  } catch (error) {
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

    // Add token to revoked tokens
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
