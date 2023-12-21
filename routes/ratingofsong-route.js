const express = require("express");

const {
  getratingforsongcontroller,
  getratingforsongidcontroller,
  insertratingforsongcontroller,
  updateratingsongcontroller,
  deleteratingforsongcontroller,
} = require("../controllers/ratingforsong-controller");

const {
  insertsongratingvalidtion,
  updatesongsratingvalidtion,
  deleteRatingforsongvalid,
} = require("../validators/ratingforsongs-valid");

const router = express.Router();

router.get("/getratingsforsongs", getratingforsongcontroller);
router.get("/getratingsforsongsid/:id", getratingforsongidcontroller);
router.post(
  "/insertratingforsong",
  insertsongratingvalidtion,
  insertratingforsongcontroller
);
router.put(
  "/updateratingforsong",
  updatesongsratingvalidtion,
  updateratingsongcontroller
);
router.delete(
  "/deleteratingforsong/:id",
  deleteRatingforsongvalid,
  deleteratingforsongcontroller
);

module.exports = router;
