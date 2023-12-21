const express = require("express");
const {
  getArtistscontoller,
  getArtistsIdcontroller,
} = require("../controllers/artist_controller");

const {
  insertArtistvalidation,
  updateartistvaldition,
  deleteartistvalid,
} = require("../validators/artist-valid");

const router = express.Router();

router.get("/artists", getArtistscontoller);
router.get("/artistsId/:id", getArtistsIdcontroller);

module.exports = router;
