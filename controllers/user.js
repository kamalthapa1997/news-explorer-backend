const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userProfile = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { NotFoundError } = require("../errors/NotFoundError");
const { BadRequestError } = require("../errors/BadRequestError");
const { ConflictError } = require("../errors/ConflictError");
const { UnauthorizedError } = require("../errors/UnauthorizationError");

const getUser = (req, res, next) => {
  userProfile
    .find({})

    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Error has occured");
      }
      res.send(200).send({ data: userData });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  console.log("get current user", req.user._id);
  const userId = req.user._id;
  userProfile
    .findById(userId)
    .orFail(() => new NotFoundError("Data was not found"))
    .then((userData) => {
      console.log(userData, "=============");
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      next(err);
    });
};

// signup
// const createUser = (req, res, next) => {
//   const { name, email, password } = req.body;
//   userProfile
//     .findOne({ email })
//     .then((user) => {
//       if (!email) {
//         throw new BadRequestError("Validation Error");
//       }
//       if (user) {
//         throw new ConflictError("Email already exist");
//       }
//       return bcrypt.hash(password, 10);
//     })
//     .then((hash) => {
//       userProfile.create({
//         name,
//         email,
//         password: hash,
//       });
//     })
//     .then((user) => {
//       res.status(200).send({
//         name: user.name,
//         email: user.email,
//       });
//     })
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         next(new BadRequestError("Invalid Data Entered"));
//       } else {
//         next(err);
//       }
//     });
// };

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await userProfile.findOne({ email });

    if (user) {
      throw new ConflictError("Email already exists");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userProfile.create({ name, email, password: hash });

    res.status(200).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Invalid Data Entered"));
    } else {
      next(err);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userProfile
    .findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect Email or Password");
      }
      console.log(user);
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      console.log("1", err);
      next(err);
    });
};

module.exports = {
  login,
  getCurrentUser,
  createUser,
  getUser,
};
