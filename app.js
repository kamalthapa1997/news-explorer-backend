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

mongoose.connect(databaseAddress).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(errorLogger);
app.use(limiter);
app.use(routes);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
