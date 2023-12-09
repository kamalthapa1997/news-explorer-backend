const NewsCardsList = require("../models/newsCardsList");
const { NotFoundError } = require("../errors/NotFoundError");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { BadRequestError } = require("../errors/BadRequestError");
const { use } = require("../routes/newsCardsList");

const getItems = (req, res, next) => {
  // console.log(req.user_id, "-------------");
  const userId = req.user._id;

  console.log("userID", userId);
  NewsCardsList.find({ owner: userId })

    .then((items) => {
      console.log(items);
      res.status(200).send({ data: items });
    })
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  console.log("========>>", req.body);

  NewsCardsList.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((item) => {
      console.log("===========>>>>>", item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("You have Passed invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  NewsCardsList.findById(itemId)
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => {
      console.log(item.owner, req.user._id);
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("Requested permission denied.");
      }
      return item.deleteOne().then(() => {
        console.log("successfuly deleted");
        res.status(200).send({ message: "Item Deleted Successfully." });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
