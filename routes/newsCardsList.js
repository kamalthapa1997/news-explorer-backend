const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/newsCardsList");
const authorize = require("../middlewares/auth");
// CRUD

// CREATE
router.post("/", authorize, createItem);

// READ
router.get("/", authorize, getItems);

// UPDATE

// DELETE
router.delete("/:itemId", authorize, deleteItem);

module.exports = router;
