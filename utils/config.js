require("dotenv").config();

// JWT_SECRET

const { JWT_SECRET = "some long strinq" } = process.env;

module.exports = { JWT_SECRET };
