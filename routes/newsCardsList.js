const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/newsCardsList");
const authorize = require("../middlewares/auth");

const {
  validateNewsArticle,
  validateUserId,
} = require("../middlewares/validation");
// CRUD

// CREATE
router.post("/", authorize, validateNewsArticle, createItem);

// READ
router.get("/", authorize, getItems);

// UPDATE

// DELETE
router.delete("/:itemId", authorize, validateUserId, deleteItem);

module.exports = router;
