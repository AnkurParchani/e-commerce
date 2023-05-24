class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.status = `${this.statusCode}`.startsWith(4) ? "fail" : "error";
  }
}

module.exports = AppError;
