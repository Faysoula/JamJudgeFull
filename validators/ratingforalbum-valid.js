const { check } = require("express-validator");

const insertAlbumratingvalidtion = [
  check("Rating_title").notEmpty().withMessage("Please provide a rating title"),
  check("Rating_date")
    .notEmpty()
    .withMessage("Please provide a date to your review"),
  check("Rating_body").notEmpty().withMessage("Please provide you rating"),
  check("user_id").notEmpty().withMessage("Please insert user id"),
  check("album_id").notEmpty().withMessage("please insert album id"),
];

const updateAlbumratingvalidtion = [
  check("rating_id").notEmpty().withMessage("Please provide an id"),
  check("Rating_title").notEmpty().withMessage("Please provide a rating title"),
  check("Rating_date")
    .notEmpty()
    .withMessage("Please provide a date to your review"),
  check("Rating_body").notEmpty().withMessage("Please provide you rating"),
  check("user_id").notEmpty().withMessage("Please insert user id"),
  check("album_id").notEmpty().withMessage("please insert album id"),
];

const deleteRatingforalbumvalid = [
  check("rating_id").notEmpty().withMessage("Please provide an id"),
];

module.exports = {
  insertAlbumratingvalidtion,
  updateAlbumratingvalidtion,
  deleteRatingforalbumvalid,
};