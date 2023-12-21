const { check } = require("express-validator");

const insertAlbumValid = [
  check("album_name")
    .notEmpty()
    .withMessage("please insert the name of your record"),

  check("album_date").notEmpty().withMessage("please insert a release date"),
  check("album_date").isDate().withMessage("please insert a valid date"),
];

const updatealbumvalid = [
  check("album_id").notEmpty().withMessage("insert valid id please"),
  check("album_name")
    .notEmpty()
    .withMessage("please insert the name of your record"),

  check("album_date").notEmpty().withMessage("please insert a release date"),
  check("album_date").isDate().withMessage("please insert a valid date"),
];

const deletealbumvalid = [
  check("album_id").notEmpty().withMessage("insert valid id please"),
];

module.exports = {
  insertAlbumValid,
  updatealbumvalid,
  deletealbumvalid,
};
