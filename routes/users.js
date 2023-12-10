const router = require("express").Router();
const { getCurrentUser } = require("../controllers/user");

// GET USER
router.get("/me", getCurrentUser);

module.exports = router;
