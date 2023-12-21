const { check } = require("express-validator");

const insertsongratingvalidtion = [
  check("Rating_title").notEmpty().withMessage("Please provide a rating title"),
  check("Rating_date")
    .notEmpty()
    .withMessage("Please provide a date to your review"),
  check("Rating_body").notEmpty().withMessage("Please provide your rating"),
  check("user_id").notEmpty().withMessage("Please insert user id"),
  check("songs_id").notEmpty().withMessage("please insert song id"),
];

const updatesongsratingvalidtion = [
  check("rating_id").notEmpty().withMessage("Please provide an id"),
  check("Rating_title").notEmpty().withMessage("Please provide a rating title"),
  check("Rating_date")
    .notEmpty()
    .withMessage("Please provide a date to your review"),
  check("Rating_body").notEmpty().withMessage("Please provide you rating"),
  check("user_id").notEmpty().withMessage("Please insert user id"),
  check("songs_id").notEmpty().withMessage("please insert song id"),
];

const deleteRatingforsongvalid = [
  check("rating_id").notEmpty().withMessage("Please provide an id"),
];

module.exports = {
  insertsongratingvalidtion,
  updatesongsratingvalidtion,
  deleteRatingforsongvalid,
};
