const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const helmet = require("helmet");

const app = express();
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/error-handler");
const { limiter } = require("./middlewares/rateLimit");
const config = require("./utils/config");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const PORT = process.env.PORT || 5000;

const databaseAddress = config.database.address;

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(errorLogger);
app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "News Explorer API is running",
  });
});

app.use(routes);
app.use(errors());

app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(databaseAddress);
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

startServer();
