const express = require("express");

const {
  getRatingforalbumcontoller,
  getRatingforalbumIdcontoller,
  insertratingalbumcontroller,
  updateRatingforalbumcontroller,
  deleteratingController,
  userReviewsController,
} = require("../controllers/ratingforalbum-controller");

const {
  insertAlbumratingvalidtion,
  updateAlbumratingvalidtion,
  deleteRatingforalbumvalid,
} = require("../validators/ratingforalbum-valid");

const router = express.Router();

router.get("/myreviews", userReviewsController);
router.get("/ratingforalbum", getRatingforalbumcontoller);
router.get("/ratingforalbumid/:id", getRatingforalbumIdcontoller);
router.post("/submitReview", insertratingalbumcontroller);
router.put(
  "/updateratingalbum",
  updateAlbumratingvalidtion,
  updateRatingforalbumcontroller
);
router.delete(
  "/deleteRating/:id",
  deleteRatingforalbumvalid,
  deleteratingController
);

module.exports = router;
