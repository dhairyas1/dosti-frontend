class CustomError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
