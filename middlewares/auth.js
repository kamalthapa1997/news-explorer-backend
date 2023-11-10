const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const { UnauthorizedError } = require("../errors/UnauthorizationError");

const handleAuthError = (req, res, next) => {
  next(new UnauthorizedError("Authorization Error"));
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("Invalid Authorization Header");
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log("JWT Verification Error:", err);
    return handleAuthError(res);
  }

  req.user = payload;
  console.log("User data from JWT:", req.user);
  return next();
};

module.exports = authorize;
