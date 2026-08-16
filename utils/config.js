// require("dotenv").config();
require("dotenv").config({
  path: `.env${process.env.NODE_ENV === "production" ? ".production" : ""}`,
});

// JWT_SECRET

const { JWT_SECRET = "some long strinq" } = process.env;

module.exports = {
  JWT_SECRET,
  database: {
    address:
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/newsex_db",
  },
};
