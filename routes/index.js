const router = require("express").Router();
const newsCardList = require("./newsCardsList");
const { login, createUser } = require("../controllers/user");
const { NotFoundError } = require("../errors/NotFoundError");
const users = require("./users");
const authorize = require("../middlewares/auth");

const {
  validateloginAuth,
  validateuserInfo,
} = require("../middlewares/validation");

//signup
router.post("/signup", validateuserInfo, createUser);
//login
router.post("/signin", validateloginAuth, login);
// newscards
router.use("/articles", newsCardList);
router.use("/users", authorize, users);

router.use((req, res, next) => {
  next(new NotFoundError("The request resource is not found."));
});

module.exports = router;
