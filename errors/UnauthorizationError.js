class UnauthorizedError extends Error {
  constructor(message = "Unauthorided Error") {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = {
  UnauthorizedError,
};
