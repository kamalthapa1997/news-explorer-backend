class BadRequestError extends Error {
  constructor(message = "Invalid Inputs") {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = { BadRequestError };
