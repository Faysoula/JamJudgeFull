const { check } = require("express-validator");

const insertsongsvalidation = [
  check("songs_name")
    .notEmpty()
    .withMessage("please insert the name of your track"),
  check("songs_date").notEmpty().withMessage("please insert a release date"),
  check("songs_date").isDate().withMessage("please insert a release date"),
  check("songs_explicit")
    .notEmpty()
    .withMessage("is this song family friendly"),
]; //album_id and artist_id already being checked in service

const updatesongsvaldition = [
  check("songs_id").notEmpty().withMessage("please insert a valid id"),
  check("songs_name")
    .notEmpty()
    .withMessage("please insert the name of your track"),
  check("songs_date").notEmpty().withMessage("please insert a release date"),
  check("songs_date").isDate().withMessage("please insert a release date"),
  check("songs_explicit")
    .notEmpty()
    .withMessage("is this song family friendly"),
];

const deletsongvalid = [
  check("songs_id").notEmpty().withMessage("please insert a valid id"),
];

module.exports = {
  insertsongsvalidation,
  updatesongsvaldition,
  deletsongvalid,
};
