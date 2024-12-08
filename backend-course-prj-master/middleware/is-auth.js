const jwt = require("jsonwebtoken");
const RevokedToken = require("../models/RevokedToken");

// Get JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'dosti_secret_key_2023';

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    if (!error) {
      const error = new Error("Failed to authenticate user!");
      error.statusCode(401);
      return error;
    }
    return next(error);
  }

  console.log("auth header: ", authHeader);

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    // Check if token has been revoked
    const isRevoked = await RevokedToken.findOne({ token });
    if (isRevoked) {
      const error = new Error("Token has been revoked");
      error.statusCode = 401;
      throw error;
    }

    // Store token for potential revocation
    req.token = token;

    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
