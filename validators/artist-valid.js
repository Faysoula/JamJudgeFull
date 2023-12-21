const { check } = require("express-validator");

const insertArtistvalidation = [
  check("artist_alias").notEmpty().withMessage("please insert your stage name"),
  check("artist_genre").notEmpty().withMessage("please insert your genre"),
  check("artist_about").notEmpty().withMessage("give a breif descrption of yourself")
];

const updateartistvaldition = [
  check("artist_id").notEmpty().withMessage("insert an id please"),
  check("artist_alias").notEmpty().withMessage("please insert your stage name"),
  check("artist_genre").notEmpty().withMessage("please insert your genre"),
  check("artist_about")
    .notEmpty()
    .withMessage("give a breif descrption of yourself"),
];

const deleteartistvalid = [
  check("artist_id").notEmpty().withMessage("insert an id please"),
];

module.exports = {
  insertArtistvalidation,
  updateartistvaldition,
  deleteartistvalid,
};