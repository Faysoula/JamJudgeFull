const { validationResult } = require("express-validator");

const {
  getRatingforalbum,
  getRatingforalbumId,
  insertRatingforalbum,
  updateRatingforalbum,
  deleteRatingforalbum,
} = require("../services/ratingforalbum-service");

const getRatingforalbumcontoller = async (req, res) => {
  try {
    const ratingsalbum = await getRatingforalbum();
    res.status(200).json({ ratingsalbum });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getRatingforalbumIdcontoller = async (req, res) => {
  try {
    const rating_id = req.params.id;
    const ratingsalbum = await getRatingforalbumId(rating_id);
    res.status(200).json({ ratingsalbum });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertratingalbumcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Rating_title, Rating_date, user_id, album_id, Rating_body } =
    req.body;

  try {
    const response = await insertRatingforalbum(
      Rating_title,
      Rating_date,
      user_id,
      album_id,
      Rating_body
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateRatingforalbumcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    rating_id,
    Rating_title,
    Rating_date,
    user_id,
    album_id,
    Rating_body,
  } = req.body;

  try {
    const response = await updateRatingforalbum(
      rating_id,
      Rating_title,
      Rating_date,
      user_id,
      album_id,
      Rating_body,
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteratingController = async (req, res) => {
  const rating_id = req.params.id;

  if (!rating_id) {
    return res.status(400).json({ message: "missing rating id" });
  }

  try {
    const deletion = await deleteRatingforalbum(rating_id);
    if (deletion.affectedRows === 0) {
      return res.status(400).json({ message: "album id not found" });
    }
    res.status(200).json({ deletion });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getRatingforalbumcontoller,
  getRatingforalbumIdcontoller,
  insertratingalbumcontroller,
  updateRatingforalbumcontroller,
  deleteratingController,
};
