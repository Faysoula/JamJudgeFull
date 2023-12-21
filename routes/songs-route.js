const express = require("express");

const {
  getsongscontroller,
  getSongsIdcontroller,
  getsongsforalbumcontroller,
  getsongsforartistcontroller,
  insertsongsController,
  updatesongscontroller,
  deletesongscontroller,
  getSongsByAlbumName
} = require("../controllers/songs-controller");

const {
  insertsongsvalidation,
  updatesongsvaldition,
  deletsongvalid,
} = require("../validators/songs-valid");


const router = express.Router();

router.get("/songs", getsongscontroller);
router.get("/songsid/:id", getSongsIdcontroller);
router.get("/songsforalbum/:id", getsongsforalbumcontroller);
router.get("/songsforartist/:id", getsongsforartistcontroller);
router.get("/search", getSongsByAlbumName);
router.post("/insertsong", insertsongsvalidation, insertsongsController);
router.put("/updatesong", updatesongsvaldition, updatesongscontroller);
router.delete("/deletesong/:id", deletsongvalid, deletesongscontroller);

module.exports = router;
