const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const { errorHandler } = require("./middlewares/error-handler");
const { limiter } = require("./middlewares/rateLimit");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/newsex_db", (r) => {
  console.log(r);
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(errorLogger);
app.use(limiter);
app.use(routes);

// centralized error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
